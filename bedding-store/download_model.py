import urllib.request
import os

# Create models directory
os.makedirs("bedding-store/public/models", exist_exist=True)

# URL to a realistic bed model from Khronos/three.js or generic repo
# I will use a high quality low poly bed from sketchfab/drei examples that actually looks like a bed.
# We'll use the "bed" model from pmndrs/market-assets which is a good stand-in
try:
    urllib.request.urlretrieve("https://vazxmixjsiawhamofees.supabase.co/space/bed.glb", "bedding-store/public/models/bed.glb")
    print("Downloaded bed model successfully.")
except Exception as e:
    print(f"Error: {e}")
