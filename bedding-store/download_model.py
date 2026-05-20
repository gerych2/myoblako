import urllib.request

# Download a realistic bedding/bed model from a public repository
url = "https://raw.githubusercontent.com/pmndrs/drei-assets/master/interiors/bed/scene.gltf"
# The model might need some adjustment, let's use a known good public glTF
# Alternatively we use a simple procedural approach, but user specifically asked for useGLTF and a real model.
# I'll create a script to generate a basic realistic bed model using trimesh or just download one if available.
# Since I can't guarantee an external URL has the exact separated meshes (sheet, duvet, pillow) needed for color changing,
# I will download a suitable bed model.

# Let's search for a bed model or I will construct a realistic looking one programmatically if I can't find it.
# Actually, I'll use a placeholder URL and handle loading errors gracefully, or I'll provide a high-poly procedural bed if needed.
# Since I'm in a sandbox without guaranteed specific external assets that fit the exact mesh names perfectly,
# I will download a general bed model and apply colors to it.

import os
import requests

bed_url = "https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/bed/model.gltf"
try:
    urllib.request.urlretrieve(bed_url, "bedding-store/public/models/bed.gltf")
    print("Downloaded bed model")
except Exception as e:
    print(f"Error downloading: {e}")
