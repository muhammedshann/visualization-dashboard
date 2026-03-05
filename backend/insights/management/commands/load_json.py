import json
from django.core.management.base import BaseCommand
from insights.models import Insight


class Command(BaseCommand):

    def handle(self, *args, **kwargs):

        with open("jsondata.json") as file:
            data = json.load(file)

        objects = []

        for item in data:

            objects.append(
                Insight(
                    title=item.get("title"),
                    insight=item.get("insight"),
                    url=item.get("url"),
                    source=item.get("source"),
                    country=item.get("country"),
                    region=item.get("region"),
                    city=item.get("city"),
                    sector=item.get("sector"),
                    topics=item.get("topics"),
                    pest=item.get("pest"),
                    swot=item.get("swot"),
                    intensity=item.get("intensity"),
                    likelihood=item.get("likelihood"),
                    relevance=item.get("relevance"),
                    impact=item.get("impact"),
                    start_year=item.get("start_year"),
                    end_year=item.get("end_year"),
                    year=item.get("year"),
                    added=item.get("added"),
                    published=item.get("published"),
                )
            )

        Insight.objects.bulk_create(objects)

        print("JSON imported successfully")