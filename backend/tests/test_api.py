import uuid
from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def get_unique_credentials():
    email = f"testuser_{uuid.uuid4().hex[:8]}@example.com"
    return {"email": email, "password": "StrongPassword123!", "name": "Test User"}

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert "status" in response.json()
    assert response.json()["status"] == "healthy"
    assert "database" in response.json()

def test_root_route():
    response = client.get("/")
    assert response.status_code == 200
    assert "status" in response.json()
    assert response.json()["status"] == "online"

def test_auth_validation_error():
    response = client.post("/api/auth/login", json={})
    assert response.status_code == 422
    assert "success" in response.json()
    assert response.json()["success"] is False

def test_user_registration_and_login():
    creds = get_unique_credentials()
    # 1. Register
    reg_response = client.post("/api/auth/register", json={
        "name": creds["name"],
        "email": creds["email"],
        "password": creds["password"]
    })
    assert reg_response.status_code == 201
    
    # 2. Login
    login_response = client.post("/api/auth/login", json={
        "email": creds["email"],
        "password": creds["password"]
    })
    assert login_response.status_code == 200
    assert "access_token" in login_response.json()

def test_protected_routes():
    # Setup fresh user
    creds = get_unique_credentials()
    client.post("/api/auth/register", json=creds)
    login_response = client.post("/api/auth/login", json={"email": creds["email"], "password": creds["password"]})
    token = login_response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    # 1. Check Me
    me_response = client.get("/api/auth/me", headers=headers)
    assert me_response.status_code == 200
    assert me_response.json()["email"] == creds["email"]

    # 2. Create Analysis
    analysis_payload = {
        "headline": "Testing Dynamic Analysis Creation",
        "background": "This is a comprehensive test.",
        "options": ["Option A", "Option B"],
        "rationale": "Testing backend structure.",
        "selectedCriteria": ["Cost", "Time"],
        "concerns": "No concerns."
    }
    create_response = client.post("/api/analyses", json=analysis_payload, headers=headers)
    assert create_response.status_code == 201
    analysis_data = create_response.json()
    assert "id" in analysis_data
    analysis_id = analysis_data["id"]

    # 3. Get Analysis List
    list_response = client.get("/api/analyses", headers=headers)
    assert list_response.status_code == 200
    assert len(list_response.json()) > 0

    # 4. Get Single Analysis
    single_response = client.get(f"/api/analyses/{analysis_id}")
    assert single_response.status_code == 200
    assert single_response.json()["title"] == "Testing Dynamic Analysis Creation"

    # 5. Post Reflection
    reflection_payload = {
        "message": "Testing reflection message posting.",
        "role": "user"
    }
    reflect_response = client.post(f"/api/analyses/{analysis_id}/reflection", json=reflection_payload, headers=headers)
    assert reflect_response.status_code == 201

    # 6. List Reflections
    reflections_list_response = client.get(f"/api/analyses/{analysis_id}/reflection")
    assert reflections_list_response.status_code == 200
    assert len(reflections_list_response.json()) >= 1
