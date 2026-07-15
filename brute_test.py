import requests

url = "http://localhost:3000/auth/login"
success_count = 0
blocked_count = 0

for i in range(100):
    r = requests.post(url, json={
        "email": "admin@test.com",
        "password": f"wrongguess{i}"
    })
    print(f"Attempt {i+1}: Status {r.status_code}")
    if r.status_code == 429:
        blocked_count += 1
    else:
        success_count += 1

print(f"\nTotal requests processed without blocking: {success_count}")
print(f"Total requests blocked: {blocked_count}")