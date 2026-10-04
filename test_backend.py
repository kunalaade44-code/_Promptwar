from fastapi.testclient import TestClient
from api.index import app

with TestClient(app) as client:
    # 1. Health
    res = client.get('/api/health')
    assert res.status_code == 200, f"Health check failed: {res.text}"
    print('1. Health check passed:', res.json())

    # Direct route test (without /api prefix as Vercel rewrite might provide)
    res_direct = client.get('/health')
    assert res_direct.status_code == 200, f"Direct health route failed: {res_direct.text}"
    print('1b. Direct /health route passed')

    # 2. Register
    email = "alex.mercer@institution.org"
    res = client.post('/api/auth/register', json={
        'name': 'Alex Mercer',
        'email': email,
        'password': 'SecurePassword123!'
    })
    if res.status_code == 400:
        # User already exists from previous run, test login
        res = client.post('/api/auth/login', json={
            'email': email,
            'password': 'SecurePassword123!'
        })
    assert res.status_code in (200, 201), f"Auth failed: {res.text}"
    token = res.json().get('access_token')
    print('2. Auth passed. Token acquired:', token[:20] + "...")

    # 2b. /api/auth/me
    res_me = client.get('/api/auth/me', headers={'Authorization': f'Bearer {token}'})
    assert res_me.status_code == 200, f"Me endpoint failed: {res_me.text}"
    print('2b. Auth /me passed for user:', res_me.json().get('email'))

    # 3. Create Decision Analysis
    res_analysis = client.post('/api/analyses', json={
        'headline': 'Should I accept the 6-month internship offer?',
        'background': 'Stipend is 4200/mo, close to home, but heavy coursework semester.',
        'options': ['Accept internship', 'Decline and focus on academics', 'Negotiate hybrid 20hrs/week'],
        'rationale': 'I need industry experience and financial independence.',
        'selectedCriteria': ['Career Growth', 'Financial Stability', 'Personal Well-being'],
        'concerns': 'Academic grades drop below honours threshold'
    }, headers={'Authorization': f'Bearer {token}'})
    assert res_analysis.status_code == 201, f"Analysis create failed: {res_analysis.text}"
    analysis = res_analysis.json()
    analysis_id = analysis['id']
    print('3. Analysis created successfully. ID:', analysis_id)
    print('   Title:', analysis['title'])
    print('   Blind spots detected:', len(analysis['analysis_result'].get('blind_spots', [])))

    # 4. List Analyses
    res_list = client.get('/api/analyses', headers={'Authorization': f'Bearer {token}'})
    assert res_list.status_code == 200, f"List analyses failed: {res_list.text}"
    print('4. List analyses count:', len(res_list.json()))

    # 5. Get Single Analysis
    res_single = client.get(f'/api/analyses/{analysis_id}')
    assert res_single.status_code == 200, f"Get single analysis failed: {res_single.text}"
    print('5. Single analysis retrieved correctly')

    # 6. Post Reflection
    res_reflection = client.post(f'/api/analyses/{analysis_id}/reflection', json={
        'message': 'If my GPA drops below 3.5, I lose my university scholarship. That is my non-negotiable line.',
        'role': 'user'
    }, headers={'Authorization': f'Bearer {token}'})
    assert res_reflection.status_code == 201, f"Reflection create failed: {res_reflection.text}"
    print('6. User reflection saved.')

    # 7. Get Reflections
    res_reflections = client.get(f'/api/analyses/{analysis_id}/reflection')
    assert res_reflections.status_code == 200, f"Get reflections failed: {res_reflections.text}"
    reflections = res_reflections.json()
    print('7. Retrieved reflections count:', len(reflections))
    for r in reflections:
        print(f"   [{r['role'].upper()}]: {r['message'][:80]}...")

print("\n>>> ALL 7 BACKEND API ENDPOINTS TESTED AND VERIFIED SUCCESSFULLY! <<<")
