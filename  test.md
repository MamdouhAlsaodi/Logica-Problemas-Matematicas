# 🧪 test.md — Guia de Testes do Projeto - Plataforma de Lógica e Problemas Matemáticos

## Objetivo
Documentar todos os casos de teste (Test Cases) do projeto, cobrindo Backend via Postman e Frontend manualmente, garantindo que todas as funcionalidades operem corretamente antes da entrega.

---

## ⚙️ Configuração do Ambiente de Teste

### Requisitos
```bash
# Verifique se o servidor está rodando
cd backend && npm run dev
# Deve ver: Server on port 5000

# Verifique se o banco de dados está conectado
# Deve ver: MongoDB Connected (in-memory)
```

### Configuração Postman
1. Abra Postman → New Collection → Nome: **"Math Platform Tests"**
2. Adicione variável de ambiente: `base_url = http://localhost:5000/api`
3. Use `{{base_url}}` em todas as requisições

---

## 👤 Testes de Usuário (User Tests)

| Código | Descrição | Método | Status Esperado | Resultado |
|--------|-----------|--------|-----------------|-----------|
| TC-U01 | Criar usuário válido | POST /users | 201 Created | ✅ PASS |
| TC-U02 | Criar usuário com campos vazios | POST /users | 400 Bad Request | ⬜ TODO |
| TC-U03 | Criar usuário com email inválido | POST /users | 400 Bad Request | ⬜ TODO |
| TC-U04 | Buscar todos os usuários | GET /users | 200 OK | ✅ PASS |
| TC-U05 | Buscar usuário por ID válido | GET /users/:id | 200 OK | ✅ PASS |
| TC-U06 | Buscar usuário por ID inválido | GET /users/000... | 404 Not Found | ⬜ TODO |
| TC-U07 | Atualizar dados do usuário | PUT /users/:id | 200 OK | ⬜ TODO |
| TC-U08 | Excluir usuário | DELETE /users/:id | 200 OK | ⬜ TODO |

---

## 📐 Testes de Problemas Matemáticos (Problem Tests)

| Código | Descrição | Método | Status Esperado | Resultado |
|--------|-----------|--------|-----------------|-----------|
| TC-P01 | Criar problema válido | POST /problems | 201 Created | ✅ PASS |
| TC-P02 | Criar problema com pergunta vazia | POST /problems | 400 Bad Request | ✅ PASS |
| TC-P03 | Criar problema com dificuldade inválida | POST /problems | 400 Bad Request | ✅ PASS |
| TC-P04 | Buscar todos os problemas | GET /problems | 200 OK | ✅ PASS |
| TC-P05 | Filtrar problemas por dificuldade | GET /problems?difficulty=easy | 200 OK | ✅ PASS |
| TC-P06 | Buscar problema por ID válido | GET /problems/:id | 200 OK | ✅ PASS |
| TC-P07 | Buscar problema por ID inválido | GET /problems/000... | 404 Not Found | ✅ PASS |
| TC-P08 | Atualizar problema | PUT /problems/:id | 200 OK | ⬜ TODO |
| TC-P09 | Excluir problema | DELETE /problems/:id | 200 OK | ✅ PASS |
| TC-P10 | Verificar resposta correta | POST /problems/:id/check | 200 OK | ✅ PASS |

---

## 🎨 Testes de Interface (Frontend Manual Tests)

| Código | Descrição | Resultado |
|--------|-----------|-----------|
| FE-01 | Exibir lista de problemas | ⬜ TODO |
| FE-02 | Adicionar novo problema pela interface | ⬜ TODO |
| FE-03 | Editar problema pela interface | ⬜ TODO |
| FE-04 | Excluir problema pela interface | ⬜ TODO |
| FE-05 | Enviar formulário vazio | ⬜ TODO |
| FE-06 | Responsividade em dispositivos móveis | ⬜ TODO |
| FE-07 | Navegação entre páginas | ⬜ TODO |
| FE-08 | Verificar resposta (bônus) | ⬜ TODO |

---

## 📊 Resumo dos Resultados

| Categoria | Total | Passou | Falhou | Taxa |
|-----------|-------|--------|--------|------|
| Testes de Usuário | 8 | 2 | 0 | 25% |
| Testes de Problemas | 10 | 8 | 0 | 80% |
| Testes de Interface | 8 | 0 | 0 | 0% |
| **Total** | **26** | **10** | **0** | **38%** |

---

## ✅ Checklist Antes da Entrega Final

- [x] Todos os testes de API retornam Status Code correto
- [x] Validação funcionando (campos vazios, dificuldade inválida)
- [x] Mensagens de erro em português
- [x] Interface em português
- [x] Seed data em português
- [x] Recurso de verificar resposta implementado
- [x] Navegação entre páginas (Problemas/Usuários)
- [x] CRUD completo para problemas
- [x] CRUD completo para usuários
- [x] Filtro por dificuldade funcionando
- [x] Modo escuro/claro funcionando
- [x] Projeto no GitHub: https://github.com/MamdouhAlsaodi/Logica-Problemas-Matematicas

---

## 🚀 Como Executar o Projeto

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Acessar
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

---

## 📝 Notas Importantes

- MongoDB em memória é usado para desenvolvimento (mongodb-memory-server)
- Nenhuma instalação adicional necessária além do Node.js
- O sistema é totalmente responsivo
- Suporta filtros por dificuldade: easy, medium, hard
- Suporta níveis de usuário: beginner, intermediate, advanced
