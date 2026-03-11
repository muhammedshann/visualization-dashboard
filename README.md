# Visualization Dashboard

A full stack **data visualization dashboard** built using **Python Django, React (Vite), and PostgreSQL**. The application allows users to view, analyze, and interact with structured data through dynamic charts and dashboards. It provides a scalable backend API with Django and a responsive frontend interface powered by React.

---

## Tech Stack

### Backend

* **Python**
* **Django**
* **Django REST Framework**
* **PostgreSQL**

### Frontend

* **React**
* **Vite**
* **JavaScript**
* **CSS**
* **Tailwind**

---

## Installation and Setup

### 1. Clone the Repository

```
git clone https://github.com/muhammedshan/visualization-dashboard.git
cd visualization-dashboard
```

---

## Backend Setup (Django)

### Create Virtual Environment

```
python -m venv venv
```

Activate environment

**Linux / Mac**

```
source venv/bin/activate
```

**Windows**

```
venv\Scripts\activate
```

---

### Install Dependencies

```
pip install -r requirements.txt
```

---

### Run Migrations

```
python manage.py makemigrations
python manage.py migrate
```

---

### Start Django Server

```
python manage.py runserver
```

Backend will run at:

```
http://127.0.0.1:8000
```

---

## Frontend Setup (React + Vite)

Navigate to frontend directory:

```
cd frontend
```

Install dependencies:

```
npm install
```

Start development server:

```
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

## API Communication

The React frontend communicates with Django backend APIs using **HTTP requests**.

Example API endpoint:

```
GET /api/insights/
```

This endpoint provides data that is rendered in charts and dashboard components.

---

## Example Use Cases

* Business analytics dashboard
* Sales data visualization
* Performance tracking
* User statistics monitoring
* Operational insights

---

## Author

**Shan**

Backend Developer | Python Django | PostgreSQL | React
