#!/bin/bash

# Script de test de l'API Gemma
echo "🧪 Test de l'API Gemma/Ollama"
echo "================================"
echo ""

API_URL="https://ai.jobsacademie.tech/api/chat"
MODEL="gemma:2b"

echo "📍 URL de l'API: $API_URL"
echo "🤖 Modèle: $MODEL"
echo ""

# Test 1: Liste des modèles disponibles
echo "1️⃣  Test: Liste des modèles disponibles"
echo "----------------------------------------"
curl -s https://ai.jobsacademie.tech/api/tags | jq -r '.models[].name'
echo ""

# Test 2: Message simple
echo "2️⃣  Test: Message simple en espagnol"
echo "----------------------------------------"
RESPONSE=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "{
    \"model\": \"$MODEL\",
    \"messages\": [{\"role\": \"user\", \"content\": \"Hola, ¿cómo estás?\"}],
    \"stream\": false
  }")

echo "Réponse complète:"
echo "$RESPONSE" | jq '.'
echo ""
echo "Message extrait:"
echo "$RESPONSE" | jq -r '.message.content'
echo ""

# Test 3: Question plus complexe
echo "3️⃣  Test: Question de service"
echo "----------------------------------------"
RESPONSE=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "{
    \"model\": \"$MODEL\",
    \"messages\": [{\"role\": \"user\", \"content\": \"Necesito un electricista urgente en Madrid\"}],
    \"stream\": false
  }")

echo "Message:"
echo "$RESPONSE" | jq -r '.message.content'
echo ""

# Test 4: Conversation avec contexte
echo "4️⃣  Test: Conversation avec contexte"
echo "----------------------------------------"
RESPONSE=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "{
    \"model\": \"$MODEL\",
    \"messages\": [
      {\"role\": \"user\", \"content\": \"Hola\"},
      {\"role\": \"assistant\", \"content\": \"Hola! ¿En qué puedo ayudarte?\"},
      {\"role\": \"user\", \"content\": \"¿Qué hora es en Roma?\"}
    ],
    \"stream\": false
  }")

echo "Message:"
echo "$RESPONSE" | jq -r '.message.content'
echo ""

# Test 5: Temps de réponse
echo "5️⃣  Test: Mesure du temps de réponse"
echo "----------------------------------------"
START=$(date +%s%N)
RESPONSE=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "{
    \"model\": \"$MODEL\",
    \"messages\": [{\"role\": \"user\", \"content\": \"Test rapide\"}],
    \"stream\": false
  }")
END=$(date +%s%N)
DURATION=$(( (END - START) / 1000000 ))

echo "Temps de réponse: ${DURATION}ms"
echo ""

echo "================================"
echo "✅ Tests terminés!"
echo "================================"
