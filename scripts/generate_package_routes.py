#!/usr/bin/env python3
import json
import os
from pathlib import Path

# Rutas
modules_dir = Path('src/data/java/modules')
routes_file = Path('src/data/java/routes.json')

# Leer rutas existentes
with open(routes_file, 'r') as f:
    existing_routes = json.load(f)

# Extraer paquetes únicos de todos los módulos
packages = set()
for module_file in modules_dir.glob('*.json'):
    with open(module_file, 'r') as f:
        data = json.load(f)
        for item in data:
            slug = item.get('slug', '')
            # El paquete es la primera parte antes del '/'
            package = slug.split('/')[0]
            if package:
                packages.add(package)

# Crear rutas para paquetes
package_routes = sorted(list(packages))

# Combinar con las rutas existentes y ordenar
all_routes = existing_routes + [f"{pkg}" for pkg in package_routes if f"{pkg}" not in existing_routes]
all_routes = sorted(set(all_routes))

# Escribir back a routes.json
with open(routes_file, 'w') as f:
    json.dump(all_routes, f, indent=2)

print(f"✅ Agregadas {len(package_routes)} rutas de paquetes")
print(f"Total de rutas: {len(all_routes)}")
