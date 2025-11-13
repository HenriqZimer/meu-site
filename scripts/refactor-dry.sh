#!/bin/bash

# Script para aplicar refatorações DRY nos componentes Vue

echo "🔄 Iniciando refatoração DRY..."

# Backup dos arquivos originais
echo "📦 Criando backup..."
mkdir -p .backups
cp app/components/Courses.vue .backups/Courses.vue.bak
cp app/components/Certifications.vue .backups/Certifications.vue.bak
cp app/components/About.vue .backups/About.vue.bak

echo "✅ Backups criados em .backups/"

# Aplicar substituições nos templates
echo "🔧 Aplicando refatorações em templates..."

# Courses.vue
sed -i 's/class="modern-courses"/class="section-modern"/g' app/components/Courses.vue
sed -i 's/class="courses-container"/class="section-container"/g' app/components/Courses.vue

# Certifications.vue
sed -i 's/class="modern-certifications"/class="section-modern"/g' app/components/Certifications.vue  
sed -i 's/class="certifications-container"/class="section-container"/g' app/components/Certifications.vue

# About.vue
sed -i 's/class="modern-about"/class="section-modern"/g' app/components/About.vue
sed -i 's/class="about-container"/class="section-container"/g' app/components/About.vue

echo "✅ Templates refatorados"

echo ""
echo "🎉 Refatoração concluída!"
echo ""
echo "📋 Próximos passos:"
echo "1. Remover CSS duplicado dos componentes"
echo "2. Testar visualmente cada seção"
echo "3. Validar responsividade"
echo ""
echo "💡 Para reverter: cp .backups/*.bak app/components/"

