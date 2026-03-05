from django.db import models


class Insight(models.Model):

    title = models.TextField(null=True, blank=True)
    insight = models.TextField(null=True, blank=True)
    url = models.URLField(null=True, blank=True)

    source = models.CharField(max_length=255, null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)
    region = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)

    sector = models.CharField(max_length=255, null=True, blank=True)
    topics = models.CharField(max_length=255, null=True, blank=True)

    pest = models.CharField(max_length=255, null=True, blank=True)
    swot = models.CharField(max_length=255, null=True, blank=True)

    intensity = models.IntegerField(null=True, blank=True)
    likelihood = models.IntegerField(null=True, blank=True)
    relevance = models.IntegerField(null=True, blank=True)

    impact = models.CharField(max_length=50, null=True, blank=True)

    start_year = models.IntegerField(null=True, blank=True)
    end_year = models.IntegerField(null=True, blank=True)
    year = models.IntegerField(null=True, blank=True)

    added = models.DateField(null=True, blank=True)
    published = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.title if self.title else "Insight"