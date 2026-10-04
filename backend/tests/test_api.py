from fastapi.testclient import TestClient
import pytest
from backend.app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_root_route():
    response = client.get("/")
    assert response.status_code == 200
    assert "status" in response.json()
    assert response.json()["status"] == "online"

def test_auth_validation_error():
    # Missing required fields
    response = client.post("/api/auth/login", json={})
    assert response.status_code == 422
    assert "success" in response.json()
    assert response.json()["success"] is False
