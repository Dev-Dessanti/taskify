# Test info

- Name: Taskify E2E Tests >> should filter tasks by status
- Location: C:\Users\Felipe\Documents\taskify-frontend\taskify-frontend\tests\taskify.spec.ts:105:3

# Error details

```
Error: page.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('input[placeholder="Digite o título da tarefa"]')

    at C:\Users\Felipe\Documents\taskify-frontend\taskify-frontend\tests\taskify.spec.ts:109:16
```

# Page snapshot

```yaml
- heading "Login" [level=2]
- text: Email
- textbox
- text: Senha
- textbox
- button "Entrar"
- paragraph:
  - text: Não possui uma conta?
  - link "Criar conta":
    - /url: /register
```

# Test source

```ts
   9 | const TEST_TASK = {
   10 |   title: 'Test Task',
   11 |   description: 'This is a test task created during E2E testing.',
   12 | };
   13 |
   14 | test.describe('Taskify E2E Tests', () => {
   15 |   // Teste 1: Registro de usuário
   16 |   test('should register a new user', async ({ page }) => {
   17 |     await page.goto('/register');
   18 |     await page.fill('input[type="email"]', TEST_USER.email);
   19 |     await page.fill('input[type="password"]', TEST_USER.password);
   20 |     await page.click('button[type="submit"]');
   21 |
   22 |     // Verifica se foi redirecionado para a página de login
   23 |     await expect(page).toHaveURL(/\/login/, { timeout: 10000 });
   24 |   });
   25 |
   26 |  // Teste 2: Login com sucesso
   27 | test('should login successfully', async ({ page }) => {
   28 |   // Registro
   29 |   await page.goto('/register');
   30 |   await page.fill('input[type="email"]', TEST_USER.email);
   31 |   await page.fill('input[type="password"]', TEST_USER.password);
   32 |   await page.click('button[type="submit"]');
   33 |
   34 |   // Verifica se o registro foi bem-sucedido
   35 |   await expect(page).toHaveURL(/\/login/, { timeout: 15000 });
   36 |
   37 |   // Login
   38 |   await page.goto('/login');
   39 |   await page.fill('input[type="email"]', TEST_USER.email);
   40 |   await page.fill('input[type="password"]', TEST_USER.password);
   41 |   await page.click('button[type="submit"]');
   42 |
   43 |   // Verifica se há mensagem de erro
   44 |   const errorMessage = page.locator('text=Erro ao fazer login');
   45 |   const hasError = await errorMessage.isVisible();
   46 |   if (hasError) {
   47 |     console.log('Login failed with error:', await errorMessage.textContent());
   48 |     throw new Error('Login failed');
   49 |   }
   50 |
   51 |   // Verifica se foi redirecionado para a página de tarefas
   52 |   await expect(page).toHaveURL(/\/tasks/, { timeout: 15000 });
   53 |   await expect(page.locator('h1')).toHaveText('Minhas Tarefas', { timeout: 10000 });
   54 | });
   55 |
   56 |   // Teste 3: Criação de nova tarefa
   57 |   test('should create a new task', async ({ page }) => {
   58 |     await login(page);
   59 |     await page.goto('/tasks');
   60 |
   61 |     // Ajusta os seletores para o idioma em português
   62 |     await page.fill('input[placeholder="Digite o título da tarefa"]', TEST_TASK.title);
   63 |     await page.fill('textarea[placeholder="Digite a descrição da tarefa"]', TEST_TASK.description);
   64 |     await page.click('button[type="submit"]');
   65 |
   66 |     // Verifica se a tarefa foi criada
   67 |     await expect(page.locator(`h3:has-text("${TEST_TASK.title}")`)).toBeVisible();
   68 |     await expect(page.locator(`p:has-text("${TEST_TASK.description}")`)).toBeVisible();
   69 |   });
   70 |
   71 |   // Teste 4: Marcar tarefa como concluída
   72 |   test('should mark a task as completed', async ({ page }) => {
   73 |     await login(page);
   74 |     await page.goto('/tasks');
   75 |
   76 |     await page.fill('input[placeholder="Digite o título da tarefa"]', TEST_TASK.title);
   77 |     await page.click('button[type="submit"]');
   78 |
   79 |     // Ajusta para o texto em português
   80 |     const taskTitle = page.locator(`h3:has-text("${TEST_TASK.title}")`);
   81 |     const markAsCompletedButton = taskTitle.locator('xpath=../..').locator('button:has-text("Marcar como Concluída")');
   82 |     await markAsCompletedButton.click();
   83 |
   84 |     // Verifica se o status foi atualizado
   85 |     await expect(taskTitle).toHaveClass(/line-through/);
   86 |     await expect(page.locator(`p:has-text("Status: completed")`)).toBeVisible();
   87 |   });
   88 |
   89 |   // Teste 5: Exclusão de tarefa
   90 |   test('should delete a task', async ({ page }) => {
   91 |     await login(page);
   92 |     await page.goto('/tasks');
   93 |
   94 |     await page.fill('input[placeholder="Digite o título da tarefa"]', TEST_TASK.title);
   95 |     await page.click('button[type="submit"]');
   96 |
   97 |     const taskTitle = page.locator(`h3:has-text("${TEST_TASK.title}")`);
   98 |     const deleteButton = taskTitle.locator('xpath=../..').locator('button:has-text("Deletar")');
   99 |     await deleteButton.click();
  100 |
  101 |     await expect(taskTitle).not.toBeVisible();
  102 |   });
  103 |
  104 |   // Teste 6: Filtro por status (pendente/concluída)
  105 |   test('should filter tasks by status', async ({ page }) => {
  106 |     await login(page);
  107 |     await page.goto('/tasks');
  108 |
> 109 |     await page.fill('input[placeholder="Digite o título da tarefa"]', 'Pending Task');
      |                ^ Error: page.fill: Test timeout of 30000ms exceeded.
  110 |     await page.click('button[type="submit"]');
  111 |
  112 |     await page.fill('input[placeholder="Digite o título da tarefa"]', 'Completed Task');
  113 |     await page.click('button[type="submit"]');
  114 |     const completedTaskTitle = page.locator(`h3:has-text("Completed Task")`);
  115 |     const markAsCompletedButton = completedTaskTitle.locator('xpath=../..').locator('button:has-text("Marcar como Concluída")');
  116 |     await markAsCompletedButton.click();
  117 |
  118 |     // Ajusta os valores do select para português
  119 |     await page.selectOption('select', 'pending');
  120 |     await expect(page.locator(`h3:has-text("Pending Task")`)).toBeVisible();
  121 |     await expect(page.locator(`h3:has-text("Completed Task")`)).not.toBeVisible();
  122 |
  123 |     await page.selectOption('select', 'completed');
  124 |     await expect(page.locator(`h3:has-text("Completed Task")`)).toBeVisible();
  125 |     await expect(page.locator(`h3:has-text("Pending Task")`)).not.toBeVisible();
  126 |   });
  127 |
  128 |   // Teste 7: Bloqueio de acesso para rotas privadas sem autenticação
  129 |   test('should block access to private routes without authentication', async ({ page }) => {
  130 |     await page.goto('/tasks', { timeout: 10000 });
  131 |
  132 |     await expect(page).toHaveURL(/\/login/, { timeout: 10000 });
  133 |   });
  134 |
  135 |   // Teste 8: Validações de formulário (campos obrigatórios)
  136 |   test('should validate form fields', async ({ page }) => {
  137 |     await login(page);
  138 |     await page.goto('/tasks');
  139 |
  140 |     await page.fill('textarea[placeholder="Digite a descrição da tarefa"]', 'Description without title');
  141 |     await page.click('button[type="submit"]');
  142 |
  143 |     await expect(page.locator('p:has-text("Description without title")')).not.toBeVisible();
  144 |
  145 |     await page.goto('/register');
  146 |     await page.click('button[type="submit"]');
  147 |     await expect(page).toHaveURL(/\/register/, { timeout: 10000 });
  148 |   });
  149 |
  150 |   // Função auxiliar para login
  151 |   async function login(page) {
  152 |     await page.goto('/register');
  153 |     await page.fill('input[type="email"]', TEST_USER.email);
  154 |     await page.fill('input[type="password"]', TEST_USER.password);
  155 |     await page.click('button[type="submit"]');
  156 |
  157 |     await page.goto('/login');
  158 |     await page.fill('input[type="email"]', TEST_USER.email);
  159 |     await page.fill('input[type="password"]', TEST_USER.password);
  160 |     await page.click('button[type="submit"]');
  161 |   }
  162 | });
```