from django.test import TestCase


class FrontendTests(TestCase):
    def test_index_route_works(self):
        r = self.client.get("/")
        self.assertEqual(r.status_code, 200)
        self.assertContains(r, "Pawfect Companions")

    def test_react_routes_fall_through(self):
        """React Router routes must return 200 (not 404) so client can route them"""
        for path in ["/puppies", "/puppies/max-golden-retriever", "/about", "/login", "/nonexistent"]:
            r = self.client.get(path)
            self.assertEqual(r.status_code, 200, f"{path} should serve index.html")

    def test_health_check(self):
        r = self.client.get("/health/")
        self.assertEqual(r.status_code, 200)
        self.assertEqual(r.json()["status"], "ok")