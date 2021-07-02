:- use_module(library(http/json)).
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_client)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:-use_module(library(http/http_open)).
:- use_module(library(http/http_ssl_plugin)).


:- dynamic linhasProducao/2.
:- dynamic maquinas/1. 
:- dynamic dados_extra_maquina/9. % dados extra da maquina como location, postition etc etc 
:- dynamic ferramentas/1.
:- dynamic tipos_maq_linha/2. 
:- dynamic operacoes/1. 
:- dynamic operacao_maquina/5.
:- dynamic produtos/1.
:- dynamic operacoes_produto/2.
:- dynamic tipoOperacao/2.
:- dynamic clientes/1. 
:- dynamic dados_extra_Cliente/8.
:- dynamic prioridade_cliente/2.
:- dynamic encomenda/2. 
:- dynamic dados_Extra_Encomenda/9.
:- dynamic planoFabricoOperacao/2.
:- dynamic dadosExtraProduto/4.
:- dynamic planoFabrico/2.
:- dynamic classif_operacoes/2. 
:- dynamic operacoes_atrib_maq/2. 
:- dynamic tipoMaquina_Operacao/2. %Predicado Auxiliar Para Fazer Ligacao Dominio ARQSI-ALGAV
:- dynamic tipoMaquina/2.
:- dynamic auxiliarOperacao/5. %Predicado Auxiliar
:- dynamic maquina_TipoMaquina /2. %Predicado Auxiliar


% Pedidos http
url_Operacoes("https://fabrica.azurewebsites.net/api/operations").%---------------%feito falta testar 
url_TipoOperacoes("https://fabrica.azurewebsites.net/api/operationsType").%-------%feito falta testar 
url_Maquinas("https://fabrica.azurewebsites.net/api/machine").%------------------%feito falta testar 
url_LinhaProducao("https://fabrica.azurewebsites.net/api/productionLine").%-------%feito falta testar 
url_TiposMaquina("https://fabrica.azurewebsites.net/api/machinetype").%-----------%feito falta testar 
url_Produtos("https://producao.azurewebsites.net/api/product/").%-----------------%feito falta testar 
url_clientes("http://localhost:3000/users").%-------------------------------------%feito falta testar 
url_encomendas("http://localhost:3000/orders"). 
url_PlanoFabrico("https://producao.azurewebsites.net/api/manufacturingplan").%----%feito falta testar 

bootstrapDadosFabrica:-
    operations_data(DataOperations,ListaOperacoes),
    clients_data(ClienteData),
    products_data(ProductsData,ListaProdutos),
    orders_data(OrdersData,ClienteData), 
    manifacturing_plan_data(ManifacturingPlanData,PlanosFabrico),
    machines_data(MachinesData,ListaMaquinas),
    productionLines_data(ProductionLineData,LinhasProducao),
    machineTypes_data(MachineTypesData),
    operations_Type_data(Data),!,
    criarPredicadoOperacoesMaquina(ListaMaquinas).
    
criarPredicadoOperacoesMaquina([]):-!.
criarPredicadoOperacoesMaquina([Maquina|RestoDasMaquina]):-
    maquina_TipoMaquina(Maquina,TipoMaquinaDaMaquina),
    tipoMaquina_Operacao(TipoMaquinaDaMaquina,OperacoesDoTipoDeMaquina),
    assertz(operacoes_atrib_maq(Maquina,OperacoesDoTipoDeMaquina)),
    criarPredicadoOperacoesMaquina(RestoDasMaquina).

% ---------------------OPERACOES BASES DE DADOS--------------


%------------- PRODUTOS----------------------
products_data(Data,ProdutosAssert):-  
    url_Produtos(ProductsURL),
     setup_call_cleanup(
        http_open(ProductsURL, In, [request_header('Accept'='application/json'),cert_verify_hook(cert_accept_any)
        ]),
        json_read_dict(In, Data),
        close(In)
    ),  products(Data,ProductsTest),
        criarPredicadoProduto(ProductsTest,ProdutosAssert),
        assertz(produtos(ProdutosAssert)).

products(Data, Compounds) :-
    dicts_to_compounds(Data, [ productId,name,manufacturingPlanId,mpDate ], dict_fill(null), Compounds),
	write(Compounds).

criarPredicadoProduto([],[]).
criarPredicadoProduto([row(ProductId,Name,ManufacturingPlanId,MpDate)|RestoProdutos],[ProductId|ProdutosAdicionados]):-
    assertz(dadosExtraProduto(ProductId,Name,ManufacturingPlanId,MpDate)),
    assertz(planoFabricoOperacao(ProductId,ManufacturingPlanId)),
    criarPredicadoProduto(RestoProdutos,ProdutosAdicionados).

% --------------------MAQUINAS---------------------------------
machines_data(MachinesData,ListaMaquinas) :-
	url_Maquinas(MachinesURL),
	setup_call_cleanup( 
		http_open(MachinesURL, In, [request_header('Accept'='application/json'),cert_verify_hook(cert_accept_any)
        ]),
        json_read_dict(In, MachinesData),
        close(In)),
		machines(MachinesData,MachinesTest),
        criarPredicadoMaquinas(MachinesTest,ListaMaquinas),
        assertz(maquinas(ListaMaquinas)).
	
machines(Data,Compounds) :-	
	 dicts_to_compounds(Data,[machineId,designation,machineTypeId,model,location_factory,location_section,location_floor,position,capacity], dict_fill(null), Compounds),
	 write(Compounds).

criarPredicadoMaquinas([],[]).
criarPredicadoMaquinas([row(MachineId,Designation,MachineTypeId,Model,Location_factory,Location_section,Location_floor,Position,Capacity)|RestoDasMaquinas],[MachineId|MaquinasJaAdicionadas]):-
    assertz(maquina_TipoMaquina(MachineId,MachineTypeId)),
    assertz(dados_extra_maquina(MachineId,Designation,MachineTypeId,Model,Location_factory,Location_section,Location_floor,Position,Capacity)),
    criarPredicadoMaquinas(RestoDasMaquinas,MaquinasJaAdicionadas).


% ------------------OPERACOES-------------------------------------
operations_data(Data,ListaOperacoes) :-
    url_Operacoes(URL),
    setup_call_cleanup(
        http_open(URL, In, [request_header('Accept'='application/json'),cert_verify_hook(cert_accept_any)
        ]),
        json_read_dict(In, Data),
        close(In)
    ), operations(Data,Test),
        criarPredicadoOperacoes(Test,ListaOperacoes),
        assertz(operacoes(ListaOperacoes)),
        criarFerramentas(Test,ListaFerramentas),
        sort(ListaFerramentas,ListaFerramentasUnicas),
        assertz(ferramentas(ListaFerramentasUnicas)).

operations(Data, Compounds) :-
    dicts_to_compounds(Data,[operationsDTOId,toolDesc,name,duration,operationsTypeId], dict_fill(null), Compounds),
	write(Compounds).

criarPredicadoOperacoes([],[]).
criarPredicadoOperacoes([row(OperationsDTOId,ToolDesc,Name,Duration,OperationsTypeId)|RestoDasOperacoes],[OperationsDTOId|RestoDasOperacoesJaAdicionadas]):-
    assertz(auxiliarOperacao(Name,ToolDesc,Duration,2,OperationsTypeId)), %2 corresponde ao tempo de setup, tem de ser alterado no MDF
    assertz(classif_operacoes(OperationsDTOId,OperationsTypeId)),
    criarPredicadoOperacoes(RestoDasOperacoes,RestoDasOperacoesJaAdicionadas).

criarFerramentas([],[]).
criarFerramentas([row(OperationsDTOId,ToolDesc,Name,Duration,OperationsTypeId)|RestoFerramentas],[ToolDesc|FerramentasAdicionadas]):-
    criarFerramentas(RestoFerramentas,FerramentasAdicionadas).

%------------------TIPOS DE OPERACOES----------------------------

operations_Type_data(Data):-
    url_TipoOperacoes(URL),
    setup_call_cleanup( 
		http_open(URL, In, [request_header('Accept'='application/json'),cert_verify_hook(cert_accept_any)
        ]),
        json_read_dict(In, Data),
        close(In)),
        operationsType(Data,Ops),
        criarPredicadoAuxiliar(Ops).

operationsType(Data,Compounds) :-	
	 dicts_to_compounds(Data, [designation,id], dict_fill(null), Compounds),
	 write(Compounds).
 
criarPredicadoAuxiliar([]).
criarPredicadoAuxiliar([row(Designation,Id)|RestoDasMachineTypes]):-
    assertz(tipoOperacao(Id,Designation)),
    criarPredicadoAuxiliar(RestoDasMachineTypes).


%------------------TIPOS DE MAQUINAS----------------------------
machineTypes_data(MachineTypesData):-
    url_TiposMaquina(MachineTypesURL),
    setup_call_cleanup( 
		http_open(MachineTypesURL, In, [request_header('Accept'='application/json'),cert_verify_hook(cert_accept_any)
        ]),
        json_read_dict(In, MachineTypesData),
        close(In)),
        machineTypes(MachineTypesData,MachineTypeTests),
        criarPredicadoAuxiliar(MachineTypeTests).

machineTypes(Data,Compounds) :-	
	 dicts_to_compounds(Data, [idMachineType,designation,operations], dict_fill(null), Compounds),
	 write(Compounds).
 
criarPredicadoAuxiliar([]).
criarPredicadoAuxiliar([row(IdMachineType,Designation,Operations)|RestoDasMachineTypes]):-
    assertz(tipoMaquina(IdMachineType,Designation)),
    assertz(tipoMaquina_Operacao(IdMachineType,Operations)),
    criarPredicadoAuxiliar(RestoDasMachineTypes).

%----------------------CLIENTES----------------------
clients_data(Data):-
    url_clientes(ClientsUrl),
     setup_call_cleanup(
        http_open(ClientsUrl, In, [request_header('Accept'='application/json'),cert_verify_hook(cert_accept_any)
        ]),
        json_read_dict(In, Data),
        close(In)
    ), clientes(Data,ClientsTest),
        criarPredicadoClientes(ClientsTest,ClientesToBeAsserted),
        assertz(clientes(ClientesToBeAsserted)),
        criarPredicadoPrioridade(ClientsTest).

clientes(Data, Compounds) :-
    dicts_to_compounds(Data, [nif,name,email,password,mobileNumbers,priority,incapacity,role], dict_fill(null), Compounds),
	write(Compounds).

criarPredicadoClientes([],[]).
criarPredicadoClientes([row(Nif,Name,Email,Password,MobileNumbers,Priority,Incapacity,Role)|RestoClientes],[Nif|ClientesAdicionados]):-
    assertz(dados_extra_Cliente(Nif,Name,Password,Email,MobileNumbers,Priority,Incapacity,Role)),
    criarPredicadoClientes(RestoClientes,ClientesAdicionados).

criarPredicadoPrioridade([]).
criarPredicadoPrioridade([row(Nif,Name,Email,Password,MobileNumbers,Priority,Incapacity,Role)|RestoClientes]):-
    assertz(prioridade_cliente(Nif,Priority)),
    criarPredicadoPrioridade(RestoClientes).


% ----------------------LINHAS DE PRODUCAO----------------------------------
productionLines_data(ProductionLinesData,LinhasProducao) :-
	url_LinhaProducao(ProductionLinesURL),
	setup_call_cleanup( 
		http_open(ProductionLinesURL, In, [request_header('Accept'='application/json'),cert_verify_hook(cert_accept_any)
        ]),
        json_read_dict(In, ProductionLinesData),
        close(In)),
		productionLines(ProductionLinesData,ListaLinhas),
        saveLinhas(ListaLinhas,LinhasProducao).

saveLinhas([],_).
saveLinhas([row(ProductionLineId,MachineList)|RestoDasLinhas],[ProductionLineId|LinhasJaAdicionadas]):-
    assertz(linhasProducao(ProductionLineId,MachineList)),
    saveLinhas(RestoDasLinhas,LinhasJaAdicionadas).

productionLines(Data,Compounds) :-	
	 dicts_to_compounds(Data, [productionLineId,machineList], dict_fill(null), Compounds),
	 write(Compounds).
	

%-----------------------PLANO FABRICO--------------------------------
manifacturing_plan_data(ManifacturingPlanData,ListaPlanosFabrico) :-
	url_PlanoFabrico(ManifacturingPlanURL),
	setup_call_cleanup( 
		http_open(ManifacturingPlanURL, In, [request_header('Accept'='application/json'),cert_verify_hook(cert_accept_any)
        ]),
        json_read_dict(In, ManifacturingPlanData),
        close(In)),
		manifacturingPlan(ManifacturingPlanData,PlanosFabrico),
        criarmanifacturingPlan(PlanosFabrico,ListaPlanosFabrico).
     
manifacturingPlan(Data,Compounds) :-	
	 dicts_to_compounds(Data, [manufacturingPlanId,date,operactions], dict_fill(null), Compounds),
	 write(Compounds).
  
criarmanifacturingPlan([],[]).
criarmanifacturingPlan([row(ManufacturingPlanId,Date,Operactions)|RestoPlanosFabrico],[ManufacturingPlanId|PlanosFabricoJaAdicionadas]):-
    assertz(planoFabrico(ManufacturingPlanId,Date)),
    assertz(planoFabricoOperacao(ManufacturingPlanId,Operactions)),
    criarmanifacturingPlan(RestoPlanosFabrico,PlanosFabricoJaAdicionadas).

%-----------------ENCOMENDA-----------------------
orders_data(OrdersData,ClientsData):-
   clientes(ClientsData,ConteudoCadaCliente),
   ordersPorCLiente(OrdersData,ConteudoCadaCliente).

ordersPorCLiente([],_).
ordersPorCLiente(Data,[row(Nif,Name,Email,Password,MobileNumbers,Priority,Incapacity,Role)| RestoClientes ]):-
    obterEncomendasDoCliente(Data,Nif,ListaEncomendas),
    assertz(encomenda(Nif,ListaEncomendas)),
    ordersPorCLiente(Data,RestoClientes).
    
obterEncomendasDoCliente(Data,Nif,ListaEncomendas):-
    url_encomendas(URL),
    string_concat(URL,'/',URLX),
    string_concat(URLX,Nif,OrdersURL),
   
	setup_call_cleanup( 
		http_open(OrdersURL, In, [request_header('Accept'='application/json'),cert_verify_hook(cert_accept_any)
        ]),
        json_read_dict(In, Data),
        close(In)),
    orders(Data, Compounds),
   	fazerAssertEncomenda(Compounds,ListaEncomendas).
   
orders(Data, Compounds) :-
    dicts_to_compounds(Data, [state,quantity,date,delivery,address,NIB,ClientNif,ProductName,idOrder], dict_fill(null), Compounds),
	write(Compounds).
  
fazerAssertEncomenda([],[]).
fazerAssertEncomenda([row(State,Quantity,Date,Delivery,Address,NIB,ClientNif,ProductName,IdOrder)|RestoDosProdutosDesteCliente],[e(ProductName,Quantity,1)|EncomendasJaAdicionadas]):-
   assertz(dados_Extra_Encomenda(IdOrder,State,Quantity,Date,Delivery,Address,NIB,ClientNif,ProductName)),
   fazerAssertEncomenda(RestoDosProdutosDesteCliente,EncomendasJaAdicionadas).   
    