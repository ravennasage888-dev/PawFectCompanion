from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from backend.models.publications import Puppy
from backend.models.subscribers import PuppyInquiry, Subscriber
from django.contrib.auth import get_user_model

User = get_user_model()

class PuppyModelTests(TestCase):
    def test_puppy_creation(self):
        p = Puppy.objects.create(
            name="Test", breed="Retriever", age_weeks=8, gender="M",
            price=1000, market="US", location="Testville", status="AVAILABLE"
        )
        self.assertIn("Test", str(p))
        self.assertTrue(p.slug)  # auto-generated

class PublicApiTests(APITestCase):
    def setUp(self):
        Puppy.objects.create(name="Buddy", breed="Lab", age_weeks=7, gender="M",
                             price=500, market="US", location="NYC", status="AVAILABLE")
        Puppy.objects.create(name="Sold", breed="Beagle", age_weeks=12, gender="F",
                             price=600, market="UK", location="London", status="SOLD")

    def test_public_only_sees_available(self):
        r = self.client.get("/api/puppies/")
        self.assertEqual(r.status_code, 200)
        names = [p["name"] for p in r.data["results"]]
        self.assertIn("Buddy", names)
        self.assertNotIn("Sold", names)  # SOLD hidden from public

    def test_submit_inquiry(self):
        p = Puppy.objects.first()
        r = self.client.post("/api/inquiries/", {
            "customer_name": "Test", "customer_email": "t@t.com",
            "message": "Hi", "puppy": p.id, "market": "US"
        }, format="json")
        self.assertEqual(r.status_code, 201)
        self.assertTrue(PuppyInquiry.objects.filter(customer_email="t@t.com").exists())

class AdminPermissionTests(APITestCase):
    def setUp(self):
        self.ceo = User.objects.create_superuser("ceo", "c@c.com", "pw")
        self.staff = User.objects.create_user("staff", "s@s.com", "pw", is_staff=True)
        self.p = Puppy.objects.create(name="X", breed="Y", age_weeks=8, gender="M",
                                       price=999, market="US", location="Z", status="AVAILABLE")

    def test_ceo_can_change_price(self):
        self.client.force_authenticate(user=self.ceo)
        r = self.client.patch(f"/api/admin/puppies/{self.p.id}/", {"price": 1500}, format="json")
        self.assertEqual(r.status_code, 200)
        self.p.refresh_from_db()
        self.assertEqual(self.p.price, 1500)

    def test_staff_cannot_access_admin_puppies(self):
        self.client.force_authenticate(user=self.staff)
        r = self.client.get("/api/admin/puppies/")
        self.assertEqual(r.status_code, 403)  # Staff != superuser