from rest_framework import serializers
from backend.models.subscribers import PuppyInquiry, Subscriber

class PuppyInquiryCreateSerializer(serializers.ModelSerializer):
    """Public: customers can SUBMIT inquiries only"""
    class Meta:
        model = PuppyInquiry
        fields = ["puppy","customer_name","customer_email","customer_phone",
                  "market","city","message","has_owned_dog","household_kids",
                  "household_pets","housing_type"]
        # status, assigned_to, admin_notes are WRITE-ONLY protected

class SubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = ["name","contact_method","contact_info","market","interested_breeds"]