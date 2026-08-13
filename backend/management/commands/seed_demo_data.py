from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from backend.models.publications import Puppy
from backend.models.subscribers import Subscriber, PuppyInquiry
import random

User = get_user_model()

class Command(BaseCommand):
    help = "Seed demo puppies, inquiries, and users for Pawfect Companions"

    def handle(self, *args, **opts):
        # 1. Create CEO superuser
        if not User.objects.filter(email="ceo@pawfectcompanions.com").exists():
            User.objects.create_superuser(
                username="ceo", email="ceo@pawfectcompanions.com", password="Pawfect2026!",
                first_name="CEO", last_name="Account"
            )
            self.stdout.write("✅ CEO created: ceo@pawfectcompanions.com / Pawfect2026!")

        # 2. Create staff user
        if not User.objects.filter(email="staff@pawfectcompanions.com").exists():
            staff = User.objects.create_user(
                username="staff", email="staff@pawfectcompanions.com", password="Pawfect2026!",
                is_staff=True
            )
            self.stdout.write("✅ Staff created: staff@pawfectcompanions.com / Pawfect2026!")

        # 3. Seed 12 puppies across 3 markets
        PUP = [
            ("Max","Golden Retriever",8,"M",1250,"US","Atlanta, GA"),
            ("Bella","French Bulldog",10,"F",2800,"US","Dallas, TX"),
            ("Charlie","Labrador",7,"M",950,"US","Chicago, IL"),
            ("Luna","Golden Retriever",9,"F",1350,"US","Miami, FL"),
            ("Winston","English Bulldog",9,"M",3500,"UK","London"),
            ("Daisy","Beagle",8,"F",1100,"UK","Manchester"),
            ("Archie","Welsh Terrier",10,"M",1450,"UK","Edinburgh"),
            ("Poppy","Corgi",7,"F",1800,"UK","Cardiff"),
            ("Luna","Siberian Husky",9,"F",1650,"CA","Toronto, ON"),
            ("Thor","Alaskan Malamute",8,"M",1900,"CA","Calgary, AB"),
            ("Nanook","Newfoundland",10,"F",2100,"CA","Vancouver, BC"),
            ("Maple","Labrador",7,"F",1050,"CA","Ottawa, ON"),
        ]
        created = 0
        for name, breed, age, g, price, mkt, loc in PUP:
            if not Puppy.objects.filter(name=name, breed=breed, market=mkt).exists():
                Puppy.objects.create(
                    name=name, breed=breed, age_weeks=age, gender=g, price=price,
                    market=mkt, location=loc, status="AVAILABLE",
                    description=f"{name} is a wonderful {breed.lower()} looking for a forever home. Raised with love, fully socialized, and ready to join your family!",
                    personality=["Friendly","Playful","Socialized"],
                    tags=["Vet Checked","Vaccinated","Dewormed","Microchipped"],
                )
                created += 1
        self.stdout.write(f"✅ {created} puppies seeded")

        # 4. Sample inquiries
        if PuppyInquiry.objects.count() < 5:
            pups = list(Puppy.objects.all()[:3])
            names = ["Sarah Johnson","James Wilson","Priya Patel","Emma Brown","Lucas Martin"]
            for i, n in enumerate(names):
                PuppyInquiry.objects.create(
                    puppy=random.choice(pups) if pups else None,
                    customer_name=n, customer_email=f"{n.lower().replace(' ','.')}@email.com",
                    customer_phone=f"+1-555-01{i}0-{1000+i}",
                    market=random.choice(["US","UK","CA"]),
                    city=random.choice(["Austin","London","Toronto","Vancouver"]),
                    message=f"Hi! We are very interested in this puppy. We have a home with a fenced yard and {random.choice(['2 young kids','no kids','older kids'])} and {random.choice(['are experienced dog owners','this would be our first dog'])}",
                    has_owned_dog=random.choice([True, False]),
                    status=random.choice(["NEW","CONTACTED","INTERVIEWED","APPROVED"]),
                )
            self.stdout.write("✅ Sample inquiries seeded")

        self.stdout.write(self.style.SUCCESS("\n🎉 Demo data complete!"))
        self.stdout.write("👉 Run: poetry run python manage.py runserver")