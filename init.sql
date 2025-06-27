-- Criação do banco de dados de loja

-- Tabela de Funcionários
CREATE TABLE funcionarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cargo VARCHAR(50),
    salario DECIMAL(10, 2),
    data_admissao DATE
);

-- Tabela de Produtos (Estoque)
CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2),
    estoque INT DEFAULT 0
);

-- Tabela de Compras
CREATE TABLE compras (
    id SERIAL PRIMARY KEY,
    funcionario_id INT REFERENCES funcionarios(id),
    data_compra DATE DEFAULT CURRENT_DATE,
    total DECIMAL(10, 2)
);

-- Tabela de Itens de Compras (relacionamento de compras e produtos)
CREATE TABLE itens_compra (
    id SERIAL PRIMARY KEY,
    compra_id INT REFERENCES compras(id),
    produto_id INT REFERENCES produtos(id),
    quantidade INT,
    preco_unitario DECIMAL(10, 2)
);

-- Inserção de dados para Funcionários
INSERT INTO funcionarios (nome, cargo, salario, data_admissao) VALUES
('João Silva', 'Caixa', 1500.00, '2023-01-01'),
('Maria Oliveira', 'Gerente', 5000.00, '2022-03-15'),
('Carlos Souza', 'Vendedor', 2000.00, '2023-05-10'),
('Luciana Costa', 'Estoquista', 1800.00, '2021-07-25'),
('Paulo Rocha', 'Vendedor', 2200.00, '2024-01-01');

-- Inserção de dados para Produtos
INSERT INTO produtos (nome, descricao, preco, estoque) VALUES
('Camisa Polo', 'Camisa de algodão, diversas cores', 59.99, 100),
('Tênis Esportivo', 'Tênis confortável para atividades físicas', 129.99, 50),
('Camiseta Básica', 'Camiseta 100% algodão', 39.99, 150),
('Calça Jeans', 'Calça jeans de corte reto', 89.99, 80),
('Relógio de Pulso', 'Relógio de aço inox', 199.99, 30);

-- Inserção de dados para Compras
INSERT INTO compras (funcionario_id, data_compra, total) VALUES
(1, '2025-04-20', 159.97),
(2, '2025-04-21', 420.98),
(3, '2025-04-22', 199,99);

-- Inserção de dados para Itens de Compras
INSERT INTO itens_compra (compra_id, produto_id, quantidade, preco_unitario) VALUES
(1, 1, 2, 59.99),
(1, 3, 1, 39.99),
(2, 2, 2, 129.99),
(2, 4, 1, 89.99),
(3, 5, 1, 199.99);
