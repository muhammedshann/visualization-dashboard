#!/usr/bin/env bash
# exit on error
set -o errexit

# Install dependencies
pip install -r requirements.txt

# Gather all CSS/JS files for production (CRITICAL)
python manage.py collectstatic --no-input

# Run database migrations
python manage.py migrate

# Run your custom data import command 
# (Note: No .py extension here!)
python manage.py load_json