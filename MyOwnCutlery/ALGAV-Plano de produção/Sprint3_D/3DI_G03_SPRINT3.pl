% Fï¿½BRICA

% Linhas

linhas([lA,lB]).


% Maquinas

% as mï¿½quinas mf atï¿½ mj sï¿½o iguais ï¿½s mï¿½quinas ma atï¿½ me e constituem a linha lB igual a lA
% as mï¿½quinas mk atï¿½ mm constituem a linha lC 
maquinas([ma,mb,mc,md,me,mf,mg,mh,mi,mj,mk,ml,mm]).



% Ferramentas

% as ferramentas fa1 atï¿½ fj1 sï¿½o iguais ï¿½s ferramentas fa a fj, sendo usadas pelas mï¿½quinas mf atï¿½ mj
 
ferramentas([fa,fb,fc,fd,fe,ff,fg,fh,fi,fj,fa1,fb1,fc1,fd1,fe1,ff1,fg1,fh1,fi1,fj1,fk,fl,fm]).


% Maquinas que constituem as Linhas

tipos_maq_linha(lA,[ma,mb,mc,md,me]).
tipos_maq_linha(lB,[mf,mg,mh,mi,mj]).
%tipos_maq_linha(lC,[mk,ml,mm]).

% ...


% Operaï¿½ï¿½es

tipo_operacoes([opt1,opt2,opt3,opt4,opt5,opt6,opt7,opt8,opt9,opt10,opt11,opt12,opt13]).

% operacoes/1 vai ser criado dinamicamente
%no exemplo dara' uma lista com 92 operaï¿½ï¿½es: 50 operacoes pelos 10 lotes de produtos * 5 operacoes que poderï¿½o ir para as linhas lA ou lB mais 14 lotes de produtos * 3 operaï¿½ï¿½es que irï¿½o para a linha lC

%operacoes_atrib_maq/2 vai ser criado dinamicamente
%no exemplo as mï¿½quinas mk a mm terï¿½o 14 operacoes atribuidas, uma por cada lote de produtos que irï¿½ para lC; as operaï¿½ï¿½es atribuï¿½das ï¿½s mï¿½quinas ma atï¿½ mj dependem do balanceamento que for feito 

% classif_operacoes/2 deve ser criado dinamicamente 
%no exemplo teremos 92 factos deste tipo, um para cada operacao


% Afetaï¿½ï¿½o de tipos de operaï¿½ï¿½es a tipos de mï¿½quinas
% com ferramentas, tempos de setup e tempos de execucao)

operacao_maquina(opt1,ma,fa,1,1).
operacao_maquina(opt2,mb,fb,2.5,2).
operacao_maquina(opt3,mc,fc,1,3).
operacao_maquina(opt4,md,fd,1,1).
operacao_maquina(opt5,me,fe,2,3).
operacao_maquina(opt6,mb,ff,1,4).
operacao_maquina(opt7,md,fg,2,5).
operacao_maquina(opt8,ma,fh,1,6).
operacao_maquina(opt9,me,fi,1,7).
operacao_maquina(opt10,mc,fj,20,2).
operacao_maquina(opt1,mf,fa1,1,1).
operacao_maquina(opt2,mg,fb1,2.5,2).
operacao_maquina(opt3,mh,fc1,1,3).
operacao_maquina(opt4,mi,fd1,1,1).
operacao_maquina(opt5,mj,fe1,2,3).
operacao_maquina(opt6,mg,ff1,1,4).
operacao_maquina(opt7,mi,fg1,2,5).
operacao_maquina(opt8,mf,fh1,1,6).
operacao_maquina(opt9,mj,fi1,1,7).
operacao_maquina(opt10,mh,fj1,20,2).
operacao_maquina(opt11,mk,fk,3,2).
operacao_maquina(opt12,ml,fl,1,4).
operacao_maquina(opt13,mm,fm,1,3).






%...


% PRODUTOS

% os produtos pA atï¿½ pF podem ser fabricados em lA ou lB
% os produtos pG atï¿½ pJ sï¿½ podem ser fabricados em lC

produtos([pA,pB,pC,pD,pE,pF,pG,pH,pI,pJ]).

operacoes_produto(pA,[opt1,opt2,opt3,opt4,opt5]).
operacoes_produto(pB,[opt1,opt6,opt3,opt4,opt5]).
operacoes_produto(pC,[opt1,opt2,opt3,opt7,opt5]).
operacoes_produto(pD,[opt8,opt2,opt3,opt4,opt5]).
operacoes_produto(pE,[opt1,opt2,opt3,opt4,opt9]).
operacoes_produto(pF,[opt1,opt2,opt10,opt4,opt5]).
operacoes_produto(pG,[opt11,opt12,opt13]).
operacoes_produto(pH,[opt11,opt12,opt13]).
operacoes_produto(pI,[opt11,opt12,opt13]).
operacoes_produto(pJ,[opt11,opt12,opt13]).



% ENCOMENDAS

%Clientes

clientes([clA,clB,clC,clD,clE,clF,clG]).


% prioridades dos clientes

prioridade_cliente(clA,2).
prioridade_cliente(clB,1).
prioridade_cliente(clC,3).
prioridade_cliente(clD,1).
prioridade_cliente(clE,1).
prioridade_cliente(clF,1).
prioridade_cliente(clG,1).
prioridade_cliente(clJ,1).

% ...

% Encomendas do cliente, 
% termos e(<produto>,<n.unidades>,<tempo_conclusao>)

% encomendas que poderï¿½o ir para a linha lA ou lB
encomenda(clA,[e(pA,4,50)]).
encomenda(clA,[e(pB,4,70)]).
encomenda(clB,[e(pC,3,30)]).
encomenda(clB,[e(pD,5,200)]).
encomenda(clC,[e(pE,4,60)]).
encomenda(clC,[e(pF,6,120)]).
encomenda(clA,[e(pD,1,500)]).
%encomenda(clA,[e(pF,20,450)]).
%encomenda(clB,[e(pB,4,100)]).
%encomenda(clC,[e(pA,3,100)]).
% encomendas que irï¿½o para a linha lC
%encomenda(clD,[e(pG,5,40)]).
%encomenda(clE,[e(pH,3,30)]).
%encomenda(clF,[e(pI,4,60)]).
%encomenda(clJ,[e(pJ,5,140)]).
%encomenda(clD,[e(pJ,5,200)]).
%encomenda(clE,[e(pG,4,150)]).
%encomenda(clF,[e(pH,3,180)]).
%encomenda(clJ,[e(pI,2,100)]).
%encomenda(clA,[e(pI,4,100)]).
%encomenda(clA,[e(pH,5,170)]).
%encomenda(clB,[e(pG,5,230)]).
%encomenda(clB,[e(pJ,3,250)]).
%encomenda(clC,[e(pG,6,280)]).
%encomenda(clC,[e(pH,6,300)]).
 
% cria_op_enc - fizeram-se correcoes face a versao anterior
 
:- dynamic operacoes_atrib_maq/2.
:- dynamic classif_operacoes/2.
:- dynamic op_prod_client/9.
:- dynamic operacoes/1.
 
 
cria_op_enc:-retractall(operacoes(_)),
retractall(operacoes_atrib_maq(_,_)),retractall(classif_operacoes(_,_)),
retractall(op_prod_client(_,_,_,_,_,_,_,_,_)),
        findall(t(Cliente,Prod,Qt,TConc),
        (encomenda(Cliente,LE),member(e(Prod,Qt,TConc),LE)),
        LT),cria_ops(LT,0),
findall(Op,classif_operacoes(Op,_),LOp),asserta(operacoes(LOp)),
maquinas(LM),
 findall(_,
        (member(M,LM),
         findall(Opx,op_prod_client(Opx,M,_,_,_,_,_,_,_),LOpx),
         assertz(operacoes_atrib_maq(M,LOpx))),_).
 
cria_ops([],_).
cria_ops([t(Cliente,Prod,Qt,TConc)|LT],N):-
            operacoes_produto(Prod,LOpt),
    cria_ops_prod_cliente(LOpt,Cliente,Prod,Qt,TConc,N,N1),
            cria_ops(LT,N1).
 
 
cria_ops_prod_cliente([],_,_,_,_,Nf,Nf).
cria_ops_prod_cliente([Opt|LOpt],Client,Prod,Qt,TConc,N,Nf):-
        cria_ops_prod_cliente2(Opt,Prod,Client,Qt,TConc,N,Ni),
    cria_ops_prod_cliente(LOpt,Client,Prod,Qt,TConc,Ni,Nf).
 
 
cria_ops_prod_cliente2(Opt,Prod,Client,Qt,TConc,N,Ni):-
            Ni is N+1,
            atomic_concat(op,Ni,Op),
            assertz(classif_operacoes(Op,Opt)),
            operacao_maquina(Opt,M,F,Tsetup,Texec),
    assertz(op_prod_client(Op,M,F,Prod,Client,Qt,TConc,Tsetup,Texec)).
 
 
 
:-cria_op_enc.

%=============================================================================================================================
%                                                       CIRA TAREFAS SPIRNT 2
%=============================================================================================================================
%CRIA TAREFAS DINAMICAMENTE ---- Referente ao sprint 2
% Notas:
       %produto corresponde a uma tarefa 

:-dynamic dados_produto_cliente_da_tarefa/5.
:-dynamic produtos/1.
:-dynamic tarefa/4.
:-dynamic tarefas/1.

cria_tarefas(Resultado):-
   retractall(tarefas(_)),retractall(tarefa(_,_,_,_)),(retractall(dados_produto_cliente_da_tarefa(_,_,_,_,_));true),% apaga os dados existentes
    cria_op_enc,
    produtosExistentes(TodosProdutos,NumeroProdutosExistentes),% obtem todos os produtos de todas as encomendas e o numero total
    asserta(tarefas(NumeroProdutosExistentes)),  %restringe a existentia de tantas tarefas como o numero de produtos existentes
    cria_tarefas(TodosProdutos, NumeroProdutosExistentes,0),
    findall(tarefa(Id,TempoProcessamento,TempConc,PesoPenalizacao), tarefa(Id,TempoProcessamento,TempConc,PesoPenalizacao), Resultado).


produtosExistentes(TodosProdutos,NumeroProdutosExistentes):-
    findall(Encomedas,encomenda(_,Encomedas),ConjuntoEncomendas),
    flatten(ConjuntoEncomendas,ListaEncomendas),
    obterProdutosEncomenda(ListaEncomendas,TodosProdutos),
    length(TodosProdutos,NumeroProdutosExistentes).


obterProdutosEncomenda([],[]).
obterProdutosEncomenda([Encomenda|RestoEncomendas],[Produto|TodosProdutos]):-
    obter_produto(Encomenda,Produto),
    obterProdutosEncomenda(RestoEncomendas,TodosProdutos).

obter_produto(e(Produto,_,_),Produto).


cria_tarefas(_,NumeroProdutosExistentes,NumeroProdutosExistentes).
cria_tarefas([Produto|RestantesProdutos], NumeroProdutosExistentes,Contador):-
            IdTarefa is Contador+1,
        cria_tarefaPorProduto(Produto,IdTarefa), % cria tarefa associada a cada produto ---- aqui entra o makespan!!!!
        cria_tarefas(RestantesProdutos, NumeroProdutosExistentes,IdTarefa).


cria_tarefaPorProduto(Produto,IdTarefa):-
    obterOperacoesDoProduto(Produto,OperacoesDoProduto),
    obterOperacoesOrdenadasPeloMaiorTempoExecucao(OperacoesDoProduto,ParesOrdenadosDecrescente),

    ParesOrdenadosDecrescente = [Operacao|OperacoesRestantes],
    obterTempoExecucaoPrimeiraOperacao(Operacao,MaiorTempoExecucao),

    op_prod_client(_,_,_,Produto,Cliente,DimensaoLote,TempoConclusao,_,_),

    TempoLote is (DimensaoLote *MaiorTempoExecucao),
    somaTempoExecaoRestante(OperacoesRestantes,SomaTempoExecaoRestante),
    Makespan is  TempoLote + SomaTempoExecaoRestante,
    somaTemposPreparacao(ParesOrdenadosDecrescente,0,99999,TempoPreparacao),
    MakespanComTempoPreparacao is Makespan-TempoPreparacao,
    prioridade_cliente(Cliente,Prioridade),

    asserta(dados_produto_cliente_da_tarefa(IdTarefa,Produto,Cliente,DimensaoLote,TempoConclusao)),
    asserta(tarefa(IdTarefa, MakespanComTempoPreparacao,TempoConclusao, Prioridade)).


obterOperacoesDoProduto(Produto,OperacoesDoProduto):-findall((Texec-Op),op_prod_client(Op,_,_,Produto,_,_,_,_,Texec), OperacoesDoProduto).

%Obter uma lista de pares Operacao-tempo execucao ordenadas pelo tempo de execucao de forma decrescente
obterOperacoesOrdenadasPeloMaiorTempoExecucao(OperacoesDoProduto,ParesOrdenadosDecrescente):-
    sort(OperacoesDoProduto,ListaParesOrdenadosPelaKey),
    reverse(ListaParesOrdenadosPelaKey,ParesOrdenadosDecrescente).


obterTempoExecucaoPrimeiraOperacao( (TempoExecucao-_),TempoExecucao).

somaTempoExecaoRestante([],0).
somaTempoExecaoRestante([(TempoExecucao-_)|Operacoes],SomaTempoExecaoRestante):-
            somaTempoExecaoRestante(Operacoes,Tempo),
            SomaTempoExecaoRestante is Tempo + TempoExecucao.


somaTemposPreparacao([],_,MenorTOcupacao,MenorTOcupacao).
somaTemposPreparacao([(_-Op)|ListaOperacoes], SomatorioTempoExecucao,MenorTO, TempoPreparacao):-
    op_prod_client(Op,_,_,_,_,_,_,Tsetup,Texecucao),
    TOcupacao is SomatorioTempoExecucao - Tsetup,
    SomatorioTempoExecucao1 is SomatorioTempoExecucao+Texecucao,
    (TOcupacao<MenorTO,MenorTO1 is TOcupacao; MenorTO1 is MenorTO),
    somaTemposPreparacao(ListaOperacoes, SomatorioTempoExecucao1,MenorTO1, TempoPreparacao).

%=============================================================================================================================
%                                       BALANCIAMENTO DAS LINHAS E CRIAÃ‡ÃƒO DE AGENDAS SPIRNT 3
%=============================================================================================================================

:-dynamic agenda_maq/3. 
:-dynamic linha_escalonamento/2. % irÃ¡ conter a linha e as respetivas tarefas (Linha,ListaTarefas)

balanciamento_Linhas_Com_Criacao_Agendas:-
    cria_tarefas(ListaTarefas),
    sort(3,=<,ListaTarefas,TarefasOrdenadas), % ordena as tarfas por ordem crescente do tempo de conclusao(3. parametro da tarefa)
    cria_e_preenche_Linhas(TarefasOrdenadas,LinhasPreenchidas),
    write(LinhasPreenchidas),
    inicia_e_cria_Agendas(LinhasPreenchidas).
   
cria_e_preenche_Linhas(ListaTarefasOrdenadas,LinhasPreenchidas):- 
    findall(Linhas,linhas(Linhas),Lista),
    flatten(Lista,LinhasExistentes),
    write(LinhasExistentes),
    iniciaLinhas(LinhasExistentes,ListaLinhas),
    write(ListaLinhas),
    atribui_tarefa_linha(ListaTarefasOrdenadas,ListaLinhas,LinhasPreenchidas).

iniciaLinhas([],[]).
iniciaLinhas([L|Linhas],[ l(L,0,[])| TarefasLinha ]):-
    iniciaLinhas(Linhas,TarefasLinha).

atribui_tarefa_linha([],TarefasLinhas,TarefasLinhas).
atribui_tarefa_linha([Tarefa|Tarefas],TarefasLinha,TarefasLinhaFinal):-
    sort(2,@=<,TarefasLinha,TarefasLinhaOrd),
    get_menor_linha(Tarefa,TarefasLinhaOrd,MenorLinha),
    delete(TarefasLinha,MenorLinha,Restantes),
    MenorLinha = l(Linha,MakeSpanAcomulado,T),
    Tarefa=tarefa(_,Makespan,_,_),
    MK1 is MakeSpanAcomulado + Makespan,
    atribui_tarefa_linha(Tarefas,[l(Linha,MK1,[Tarefa|T])|Restantes],TarefasLinhaFinal).
    
get_menor_linha(_,[],erro).
get_menor_linha(Tarefa,[TarefaLinha|TarefasLinha],MenorLinha):-
    Tarefa=tarefa(IdTarefa,_,_,_),
    TarefaLinha=l(Linha,_,_),
    obterOperacoesdaLinhaSemRepetidos(Linha,OperacoesLinhaSemRepetidos),                                                         
    dados_produto_cliente_da_tarefa(IdTarefa,Produto,_,_,_),
    operacoes_produto(Produto,OperacoesProduto),!,
    ((allMembers(OperacoesProduto,OperacoesLinhaSemRepetidos),!,MenorLinha=TarefaLinha);get_menor_linha(Tarefa,TarefasLinha,MenorLinha)).
      


obterOperacoesdaLinhaSemRepetidos(Linha,OperacoesLinhaSemRepetidos):-  
    tipos_maq_linha(Linha,TiposMaquinaLinha),
    findall(Operacao,(member(Maquina,TiposMaquinaLinha), operacao_maquina(Operacao,Maquina,_,_,_) ),OperacoesLinha),
    sort(0,@<,OperacoesLinha,OperacoesLinhaSemRepetidos).

%=====================ESTAMOS AQUI NESTE METODO ==========================
inicia_e_cria_Agendas(LinhasPreenchidas):-
   brute_force(LinhasPreenchidas,Populacoes),!,
    inicializa_agendas,
    ((retractall(linha_escalonamento(_,_)));true),
    cria_pre_agendas(Populacoes,[],PreAgendasFinal),
   % write(PreAgendasFinal),
    preenche_agendas(PreAgendasFinal),
    findall((Linha,Maquina,Dados),agenda_maq(Linha,Maquina,Dados),Lista),
    %write(Lista),
    melhoria_escalonamento(AgendasSemSetUp),
    write(AgendasSemSetUp).
%=====================ESTAMOS AQUI NESTE METODO ==========================


melhoria_escalonamento(Lista):-
    linhas(Linhas),
    otimiza_escalonamento(Linhas),
    findall((Linha,Maquina,Dados),agenda_maq(Linha,Maquina,Dados),Lista).

otimiza_escalonamento([]).
otimiza_escalonamento([Linha|Linhas]):-
    otimiza_escalonamento(Linhas),
    remove_setups_linha(Linha).
    
   
remove_setups_linha(Linha):-
    findall((Linha,Maquina,Agenda),(agenda_maq(Linha,Maquina,Agenda)),Agendas),
    remove_setup_maquina(Agendas).

remove_setup_maquina([]).
remove_setup_maquina([(Linha,Maquina,Agenda)|Agendas]):-
    remove_setups(Linha,Maquina,Agenda,semFerr,[],NovaAgenda),
    Lista = [(Linha,Maquina,NovaAgenda)|[]],
    atualiza_agendas(Lista),
    remove_setup_maquina(Agendas).

remove_setups(_,_,[],_,NovaAgenda,NovaAgendaFinal):-reverse(NovaAgenda,NovaAgendaFinal).
remove_setups(Linha,Maquina,[t(_,_,setup,Ferramenta)|Outras],Ferramenta,NovaAgenda,NovaAgendaFinal):-
    remove_setups(Linha,Maquina,Outras,Ferramenta,NovaAgenda,NovaAgendaFinal).
remove_setups(Linha,Maquina,[t(Inicio,Fim,setup,NovaFerramenta)|Outras],_,NovaAgenda,NovaAgendaFinal):-
    remove_setups(Linha,Maquina,Outras,NovaFerramenta,[t(Inicio,Fim,setup,NovaFerramenta)|NovaAgenda],NovaAgendaFinal).
remove_setups(Linha,Maquina,[A|Outras],Ferramenta,NovaAgenda,NovaAgendaFinal):-
    remove_setups(Linha,Maquina,Outras,Ferramenta,[A|NovaAgenda],NovaAgendaFinal).
    

atualiza_agendas([]).
atualiza_agendas([(Linha,Maquina,NovaAgenda)|Agendas]):-
    (   (   retract(agenda_maq(Linha,Maquina,_))) ; true),
    asserta(agenda_maq(Linha,Maquina,NovaAgenda)),
    atualiza_agendas(Agendas).



   
brute_force([],[]).
brute_force([TarefaLinha|TarefasLinha],[l(Linha,Pop)|Populacoes]):-
    brute_force(TarefasLinha,Populacoes),
    (retract(tarefas(_));true), (retractall(tarefa(_,_,_,_));true),
    TarefaLinha=l(Linha,_,Tarefas),
    length(Tarefas, NumTarefas),
    asserta(tarefas(NumTarefas)),
    assert_tarefas(Tarefas),
    geraListasdeTarefas(Pop,X).
     
assert_tarefas([]).
assert_tarefas([Tarefa|Tarefas]):-
    assert_tarefas(Tarefas),
    Tarefa=tarefa(Id,MK,TConc,Prio),
    asserta(tarefa(Id,MK,TConc,Prio)).

inicializa_agendas:-
    retractall(agenda_maq(_,_,_)),
    linhas(Linhas),
    obter_Maquinas_Da_Linha_E_Assert(Linhas,Lista),
    write(Lista).

obter_Maquinas_Da_Linha_E_Assert(Linhas,ListaMaquinasLinha):-
    findall( (Linha,Maquina),
            ( member(Linha,Linhas),tipos_maq_linha(Linha,ListaMaquinas),
              member(Maquina,ListaMaquinas), 
              assertz(agenda_maq(Linha,Maquina,[]))  
            ),ListaMaquinasLinha).

cria_pre_agendas([],PreAgendas,PreAgendas).
cria_pre_agendas([Pop|Populacoes],PreAgendas,PreAgendasFinal):-
    Pop = l(Linha,Genes),
    asserta(linha_escalonamento(Linha,Genes)),
    cria_pre_agenda(Linha,Genes,PreAgenda),
    cria_pre_agendas(Populacoes,[PreAgenda|PreAgendas],PreAgendasFinal).
    
cria_pre_agenda(_,[],[]).
cria_pre_agenda(Linha,[Tarefa|Tarefas],[Lista|PreAgenda]):-
    cria_pre_agenda(Linha,Tarefas,PreAgenda),
    tipos_maq_linha(Linha,MaquinasLinha),
    obter_Dados_Relativos_Linha_Tarefa_Produto_Cliente_Tempos(Linha,Tarefa,MaquinasLinha,Lista).
    
obter_Dados_Relativos_Linha_Tarefa_Produto_Cliente_Tempos(Linha,Tarefa,MaquinasLinha,Lista):-
    dados_produto_cliente_da_tarefa(Tarefa,Produto,Client,Qt,TConc),
    findall( l(Linha,Tarefa,Op,M,F,Produto,Client,Qt,TConc,Tsetup,Texec),
             (op_prod_client(Op,_,_,Produto,Client,Qt,TConc,_,_),
             classif_operacoes(Op,Opt),
             operacao_maquina(Opt,M,F,Tsetup,Texec),
             member(M, MaquinasLinha)
    ),Lista).

isMemberOf(X,[X|_]).
isMemberOf(X,[_|T]):- isMemberOf(X,T).

allMembers([],_).
allMembers([H|T],L):- allMembers(T,L),isMemberOf(H,L). 



	
preenche_agendas([]).
preenche_agendas([PreAgendaLinha|PreAgendas]):-
    preenche_linha(PreAgendaLinha,0),
    preenche_agendas(PreAgendas).
    
preenche_linha([],_).
preenche_linha(PreAgendaLinha,InstanteInicial):-
    PreAgendaLinha=[PreAgendaTarefa|PreAgendasLinha],
    agendas(InstanteInicial,PreAgendaTarefa,[],0,0,0,InstanteFinal),
    preenche_linha(PreAgendasLinha,InstanteFinal).



agendas(_,[],_,_,_,ExecFim,ExecFim).
agendas(InstanteInicial,[Tarefa|Tarefas],Anteriores,Instante,TExecAnterior,ExecFimAnterior,InstanteFinal):-
    Tarefa = l(Linha1,Tarefa1,Op1,Maquina1,Ferramenta1,Produto1,Cliente1,Qt1,TConc1,TSetup1,TExec1),
    (   (   Instante==0,!,SetupVirtual is InstanteInicial);(   SetupVirtual is Instante - TSetup1)),
    
    (   (   SetupVirtual<InstanteInicial,!,Deslizamento is InstanteInicial-SetupVirtual, SetupInicio is InstanteInicial) 
    ; ( SetupInicio is SetupVirtual ,Deslizamento is 0  )),
        
    SetupFim is SetupInicio + TSetup1,
    ExecInicio is SetupFim,
    ((( TExecAnterior<TExec1,!,ExecFim is Qt1 * TExec1 + ExecInicio,Cadencia is TExec1))
		;(ExecFim is ExecFimAnterior + TExec1 ,Cadencia is TExecAnterior + TExec1 )),

   % desliza(Anteriores,Deslizamento, InstanteInicial),% nao funciona a 100% pelo que nao é utilizado, apenas conseguimos remover os setups.
   
    Setup = t(SetupInicio,SetupFim,setup,Ferramenta1),
    Detalhes = dadosExtraTarefa(Op1,Qt1,Produto1,Cliente1,Tarefa1),
    Execucao=t(ExecInicio, ExecFim,exec,Detalhes),
    agenda_maq(Linha1,Maquina1,Sequencia),
    ((retract(agenda_maq(Linha1,Maquina1,_)));true),
    reverse(Sequencia,SequenciaReversed),
        
	Sequencia1=[Setup|SequenciaReversed],
	Sequencia2=[Execucao|Sequencia1],
    reverse(Sequencia2,SequenciaAtualizada),
    asserta(agenda_maq(Linha1,Maquina1,SequenciaAtualizada)),
    InstanteSeguinte is ExecInicio + TExec1,
    agendas(InstanteInicial,Tarefas,[Tarefa|Anteriores],InstanteSeguinte,Cadencia,ExecFim,InstanteFinal).











obterDadosExtradaTarefa(ListaDadosExtra):- findall((Produto,Tarefa,Cliente,Qauntidade,TempoConclusao),dados_produto_cliente_da_tarefa(Produto,Tarefa,Cliente,Qauntidade,TempoConclusao),ListaDadosExtra).
%=============================================================================================================================
%                                       FIM BALANCIAMENTO DAS LINHAS E CRIAÃ‡ÃƒO DE AGENDAS SPIRNT 3
%=============================================================================================================================






%=============================================================================================================================
%                                                        SPRINT 1
%=============================================================================================================================
%=============================================================================================================================
%                                                  EXERCICIO 1 SPRINT 1
%=============================================================================================================================
%1.1-gerar sequenciamentos de opera??es para 1 m?quina considerando tempos de setup (prepara??o da m?quina com a ferramenta necess?ria) e tentar encontrar o melhor sequenciamento segundo o crit?rio de menor tempo de execu??o
%Dado uma m?quina retorna uma lista de opera??es e o tempo de ocupa??o
%%parametros:
%           - M:maquina
%           -L lista Opera??es da maquina 
%           -T lista resultatante

ocupacao(M,L,T):-
    get_time(Ti),
    ordenaOperacoesPorFerramenta(M,L),
    tempoOcupacao(semfer,L,T),
    get_time(Tf), Tcomp is Tf-Ti,
    write('Gerado em '), write(Tcomp),
    write(' segundos'),nl.
 
% Cria pares Ferramenta-Operacao
parOperacaoFerramenta(OP,FE-OP):-op_prod_client(OP,_,FE,_,_,_,_,_,_).
% Cria uma lista de operacoes ordenada alfabeticamente pelas ferramentas das opera??es
% M- Maquina
% LO- lista de operaceos da maquina
% SLK- lista ordenada pelas keys
% S- lista resultante ordenada 
% PL- lista de pares operacoes ferramentas 
ordenaOperacoesPorFerramenta(M,S):- operacoes_atrib_maq(M,LO), maplist(parOperacaoFerramenta,LO,PL), keysort(PL,SLK), pairs_values(SLK,S).
% Calcula tempo de ocupa??o de uma lista de opera??es
% F- ferramenta
% Lista no segundo parametro: lista que contem as opera??es ordenandas pela ferramenta
% T- variavel que ir? conter o somat?rio do tempo de ocupa??o das opera??es
tempoOcupacao(_,[],0).
tempoOcupacao(F,[H|L],T):- op_prod_client(H,_,F1,_,_,_,_,Tset,Texec), tempoOcupacao(F1,L,T1),
                            ((F1==F,!,T is Texec+T1);T is Tset+Texec+T1).
 
% 1.2-Dado uma m?quina retorna uma lista de opera??es e a soma dos tempos de atraso
atraso(M,L,T):-
    get_time(Ti),
    ordenaOperacoesPorPrazo(M,L),
    reverse(L,S),
    tempoAtraso(semfer,S,T,0,0),
    get_time(Tf), Tcomp is Tf-Ti,
    write('Gerado em '), write(Tcomp),
    write(' segundos'),nl.
 
% Cria pares Prazo-Operacao
parPrazoOperacao(O,P-O):-op_prod_client(O,_,_,_,_,_,P,_,_).
% Cria uma lista de operacoes ordenada, ascendente, pelos prazos
% M-maquina
% S- lista contendo as opera??es ordenadas pelo prazo
% Y- lista ordenada pelas keys
% L- lista de operaceos da maquina
% X- lista de pares operacoes prazo 
ordenaOperacoesPorPrazo(M,S):- operacoes_atrib_maq(M,L), maplist(parPrazoOperacao,L,X), keysort(X,Y), pairs_values(Y,S).
% Calcula soma dos tempos de atraso de uma lista de opera??es
% % F- ferramenta
% Lista no segundo parametro: lista que contem as opera??es ordenandas pelo prazo
% T- variavel que ir? conter o somat?rio do tempo de atraso das opera??es
% Tocupacao- variavel que guarsa o tempo de ocupa??o
% Tatraso- variavel que guarsa o tempo de atrasp
tempoAtraso(_,[],T,_,Tatraso):- T is Tatraso,!.
tempoAtraso(F,[O|L],T,Tocupacao,Tatraso):- op_prod_client(O,_,F1,_,_,_,Prazo,Tset,Texec),
                            ((F==F1,!,To1 is Tocupacao + Texec);To1 is Tocupacao+Texec+Tset),
                            ((To1<Prazo,!,Ta1 is Tatraso);Ta1 is To1-Prazo+Tatraso),
                            tempoAtraso(F1,L,T,To1,Ta1).
%=============================================================================================================================
%                                                       EXERCICIO 2 SPRINT 1
%=============================================================================================================================
% melhor escalonamento com findall, gera todas as solucoes e escolhe melhor
% ------------------------------------------------TEMPO OCUPA??O-----------------------------------------------------------
:- dynamic melhor_sol_to/2.
melhor_escalonamentoComTempoOcupacaoComFindAll(M,Lm,Tm):-
                get_time(Ti),
                findall(p(LP,Tempo),
                permuta_tempo(M,LP,Tempo), LL),
                melhor_permuta(LL,Lm,Tm),
                get_time(Tf),Tcomp is Tf-Ti,
                write('GERADO EM '),write(Tcomp),
                write(' SEGUNDOS'),nl.

melhor_permuta([p(LP,Tempo)],LP,Tempo):-!.
melhor_permuta([p(LP,Tempo)|LL],LPm,Tm):-
         melhor_permuta(LL,LP1,T1),
        ((Tempo<T1,!,Tm is Tempo,LPm=LP);(Tm is T1,LPm=LP1)).

melhor_escalonamentoComTempoOcupacaoSemFindAll(M,Lm,Tm):-
        get_time(Ti),
        (melhor_escalonamentoOcupacao(M);true),retract(melhor_sol_to(Lm,Tm)),
        get_time(Tf),Tcomp is Tf-Ti,
        write('GERADO EM '),write(Tcomp),
        write(' SEGUNDOS'),nl.

melhor_escalonamentoOcupacao(M):- asserta(melhor_sol_to(_,10000)),!,
        permuta_tempoComTempoOcupacao(M,LP,Tempo),
        atualiza(LP,Tempo),
        fail.

permuta_tempoComTempoOcupacao(M,LP,Tempo):- 
            operacoes_atrib_maq(M,L),
            permuta(L,LP),
            tempoOcupacao(semfer,LP,Tempo).

atualiza(LP,T):-melhor_sol_to(_,Tm),T<Tm,retract(melhor_sol_to(_,_)),asserta(melhor_sol_to(LP,T)),!. 

%----------------------------------------------TEMPO ATRASO--------------------------------------------------------%
melhor_escalonamentoComTempoAtrasoComFindAll(M,Lm,Tm):-
                get_time(Ti),
                findall(p(LP,Tempo), 
                permuta_tempoComTempoAtraso(M,LP,Tempo), LL),
                melhor_permuta(LL,Lm,Tm),
                get_time(Tf),Tcomp is Tf-Ti,
                write('GERADO EM '),write(Tcomp),
                write(' SEGUNDOS'),nl.

melhor_escalonamentoComTempoAtrasoSemFindAll(M,Lm,Tm):-
        get_time(Ti),
        (melhor_escalonamentoAtraso(M);true),retract(melhor_sol_to(Lm,Tm)),
        get_time(Tf),Tcomp is Tf-Ti,
        write('GERADO EM '),write(Tcomp),
        write(' SEGUNDOS'),nl.

permuta_tempoComTempoAtraso(M,LP,Tempo):- 
        operacoes_atrib_maq(M,L),
        permuta(L,LP),
        tempoAtraso(semfer,LP,Tempo,0,0).

melhor_escalonamentoAtraso(M):- 
        asserta(melhor_sol_to(_,10000)),!,
        permuta_tempoComTempoAtraso(M,LP,Tempo),
        atualiza(LP,Tempo),
        fail.
%=============================================================================================================================
%                                                       EXERCICIO 3 SPRINT 1
%                                                           HEURÃSTICAS
%=============================================================================================================================
estimativa(LOp,Estimativa):-
    findall(p(FOp,Tsetup),
    (member(Op,LOp),op_prod_client(Op,_,FOp,_,_,_,_,Tsetup,_)),
    LFTsetup),
    elimina_repetidos(LFTsetup,L),
    soma_setups(L,Estimativa).

elimina_repetidos([],[]).
elimina_repetidos([X|L],L1):-member(X,L),!,elimina_repetidos(L,L1).
elimina_repetidos([X|L],[X|L1]):-elimina_repetidos(L,L1).
soma_setups([],0).
soma_setups([p(_,Tsetup)|L],Ttotal):- soma_setups(L,T1), Ttotal is Tsetup+T1.
                
obterTemposPorOperacao(Op1,M,F,Ts,Te):-
    classif_operacoes(Op1,Opt1), %obtem o tipo de operacao conforme a operacao
    operacao_maquina(Opt1,M,F,Ts,Te). % obtem e retorna nas variaveis Ts maquina e ferramenta   

verificarFerramenta(M,F,[Op2|ROperacoes]):- 
    obterTemposPorOperacao(Op2,_,F,_,_). % verifica se a ferramenta F e igual a ferramenta da Op2 

estimativaS(LOp,Estimativa,CustoAtual):-
    findall(p(Op,Atraso),
    (member(Op,LOp),op_prod_client(Op,M,F,_,_,_,To,Ts,Te),
    ((verificarFerramenta(M,F,LOp),!,CX is Te);CX is Ts+Te),
    Aux2 is CustoAtual + CX,
    Atraso is Aux2 - To ),
    LFTsetup),
    soma_atrasos(LFTsetup,Estimativa).

soma_atrasos([],0).
soma_atrasos([p(_,Atraso)|L],Ttotal):- soma_atrasos(L,T1), Ttotal is Atraso+T1.
%=============================================================================================================================
%                                                       FINAL SPRINT 1
%=============================================================================================================================




%=============================================================================================================================
%                                                       SPRINT 2 
%=============================================================================================================================
%=============================================================================================================================
%                                                   SECÃ‡AO GENÃ‰TICO
%=============================================================================================================================
:-dynamic geracoes/1.
:-dynamic populacao/1.
:-dynamic prob_cruzamento/1.
:-dynamic prob_mutacao/1.



% parameterizaï¿½ï¿½o
inicializa:-write('Numero de novas Geracoes: '),read(NG),           (retract(geracoes(_));true), asserta(geracoes(NG)),
    write('Dimensao da Populacao: '),read(DP),
    (retract(populacao(_));true), asserta(populacao(DP)),
    write('Probabilidade de Cruzamento (%):'), read(P1),
    PC is P1/100,
    (retract(prob_cruzamento(_));true), asserta(prob_cruzamento(PC)),
    write('Probabilidade de Mutacao (%):'), read(P2),
    PM is P2/100,
    (retract(prob_mutacao(_));true), asserta(prob_mutacao(PM)).


gera:-
    cria_tarefas(R),
    inicializa,
    gera_populacao(Pop),
    write('Pop='),write(Pop),nl,
    avalia_populacao(Pop,PopAv),
    write('PopAv='),write(PopAv),nl,
    ordena_populacao(PopAv,PopOrd),
    geracoes(NG),!,
    gera_geracao(0,NG,PopOrd).

gera_populacao(Pop):-
    populacao(TamPop),
    tarefas(NumT),
    findall(Tarefa,tarefa(Tarefa,_,_,_),ListaTarefas),
    gera_populacao(TamPop,ListaTarefas,NumT,Pop).

gera_populacao(0,_,_,[]):-!.

gera_populacao(TamPop,ListaTarefas,NumT,[Ind|Resto]):-
    TamPop1 is TamPop-1,
    gera_populacao(TamPop1,ListaTarefas,NumT,Resto),
    gera_individuo(ListaTarefas,NumT,Ind),
    not(member(Ind,Resto)).
gera_populacao(TamPop,ListaTarefas,NumT,L):-
    gera_populacao(TamPop,ListaTarefas,NumT,L).

gera_individuo([G],1,[G]):-!.

gera_individuo(ListaTarefas,NumT,[G|Resto]):-
    NumTemp is NumT + 1, % To use with random
    random(1,NumTemp,N),
    retira(N,ListaTarefas,G,NovaLista),
    NumT1 is NumT-1,
    gera_individuo(NovaLista,NumT1,Resto).

retira(1,[G|Resto],G,Resto).
retira(N,[G1|Resto],G,[G1|Resto1]):-
    N1 is N-1,
    retira(N1,Resto,G,Resto1).

avalia_populacao([],[]).
avalia_populacao([Ind|Resto],[Ind*V|Resto1]):-
    avalia(Ind,V),
    avalia_populacao(Resto,Resto1).

avalia(Seq,V):-
    avalia(Seq,0,V).

avalia([],_,0).
avalia([T|Resto],Inst,V):-
    tarefa(T,Dur,Prazo,Pen),
    InstFim is Inst+Dur,
    avalia(Resto,InstFim,VResto),
    (
        (InstFim =< Prazo,!, VT is 0)
  ;
        (VT is (InstFim-Prazo)*Pen)
    ),
    V is VT+VResto.

ordena_populacao(PopAv,PopAvOrd):-
    bsort(PopAv,PopAvOrd).

bsort([X],[X]):-!.
bsort([X|Xs],Ys):-
    bsort(Xs,Zs),
    btroca([X|Zs],Ys).


btroca([X],[X]):-!.

btroca([X*VX,Y*VY|L1],[Y*VY|L2]):-
    VX>VY,!,
    btroca([X*VX|L1],L2).

btroca([X|L1],[X|L2]):-btroca(L1,L2).


parImpar(X,1):- R is rem(X,2),R==1.
parImpar(X,2).



melhores1(Lista,Melhores,Restantes,NElementos):-
    length(Lista, Length), Length >= NElementos,
    melhores(Lista,Melhores,Restantes,NElementos).


melhores(L,[],L,0).
melhores([X|L],[X|T],Restantes,N):- N1 is N-1, melhores(L,T,Restantes,N1).

gera_geracao(G,G,Pop):-!,
    write('GeraÃ§ao '), write(G), write(':'), nl, write(Pop), nl.

gera_geracao(N,G,Pop):-
    length(Pop, TamanhoPop),
    write('GeraÃ§ao '), write(N), write(':'), nl, write(Pop), nl,
    random_permutation(Pop,PopRandom), %usamos para garantir haver mais variadade
    cruzamento(PopRandom,NPop1), %para determinar onde vai existir os cruzamentos
    mutacao(NPop1,NPop), %gera a nova populacao conforme os cruzamentos realizado a mutacao
    avalia_populacao(NPop,NPopAv),
    ordena_populacao(NPopAv,NPopOrd),

    append(Pop,NPopOrd,TodasPop), %adiciona a geracao antiga Ã  gerada
    ordena_populacao(TodasPop,TodasPopOrd),
    elimina_repetidos(TodasPopOrd, TodasSemRepetidos), % elimina os repetidos apos adicionar

    length(TodasSemRepetidos, SemRepetidosLenght),
    parImpar(SemRepetidosLenght,NElementos),
    NumeroVagas is TamanhoPop - NElementos,
    melhores1(TodasSemRepetidos,Melhores,Restantes,NElementos),
    melhores1(Restantes,Melhores2,Restantes1,NumeroVagas),
    melhores1(Restantes1,Melhores3,Restantes2,NumeroVagas),
    melhores1(Restantes2,Melhores4,Restantes3,NumeroVagas),

    append(Melhores,Melhores4,Ma),
    append(Melhores2,Melhores3,Ma1),
    append(Ma,Ma1,PopFinal),

    ordena_populacao(PopFinal,PopFinalOrdenada),

    N1 is N+1,!,gera_geracao(N1,G,PopFinalOrdenada).

gerar_pontos_cruzamento(P1,P2):-
    gerar_pontos_cruzamento1(P1,P2).

gerar_pontos_cruzamento1(P1,P2):-
    tarefas(N),
    NTemp is N+1,
    random(1,NTemp,P11),
    random(1,NTemp,P21),
    P11\==P21,!,
    ((P11<P21,!,P1=P11,P2=P21);(P1=P21,P2=P11)).
gerar_pontos_cruzamento1(P1,P2):-
    gerar_pontos_cruzamento1(P1,P2).


cruzamento([],[]).
cruzamento([Ind*_],[Ind]).
cruzamento([Ind1*_,Ind2*_|Resto],[NInd1,NInd2|Resto1]):-
    gerar_pontos_cruzamento(P1,P2),
    prob_cruzamento(Pcruz),random(0.0,1.0,Pc),
    ((Pc =< Pcruz,!,
        cruzar(Ind1,Ind2,P1,P2,NInd1),
      cruzar(Ind2,Ind1,P1,P2,NInd2))
    ;
    (NInd1=Ind1,NInd2=Ind2)),
    cruzamento(Resto,Resto1).


preencheh([],[]).

preencheh([_|R1],[h|R2]):-
    preencheh(R1,R2).


sublista(L1,I1,I2,L):-
    I1 < I2,!,
    sublista1(L1,I1,I2,L).

sublista(L1,I1,I2,L):-
    sublista1(L1,I2,I1,L).

sublista1([X|R1],1,1,[X|H]):-!,
    preencheh(R1,H).

sublista1([X|R1],1,N2,[X|R2]):-!,
    N3 is N2 - 1,
    sublista1(R1,1,N3,R2).

sublista1([_|R1],N1,N2,[h|R2]):-
    N3 is N1 - 1,
    N4 is N2 - 1,
    sublista1(R1,N3,N4,R2).

rotate_right(L,K,L1):-
    tarefas(N),
    T is N - K,
    rr(T,L,L1).

rr(0,L,L):-!.

rr(N,[X|R],R2):-
    N1 is N - 1,
    append(R,[X],R1),
    rr(N1,R1,R2).


elimina([],_,[]):-!.

elimina([X|R1],L,[X|R2]):-
    not(member(X,L)),!,
    elimina(R1,L,R2).

elimina([_|R1],L,R2):-
    elimina(R1,L,R2).

insere([],L,_,L):-!.
insere([X|R],L,N,L2):-
    tarefas(T),
    ((N>T,!,N1 is N mod T);N1 = N),
    insere1(X,N1,L,L1),
    N2 is N + 1,
    insere(R,L1,N2,L2).


insere1(X,1,L,[X|L]):-!.
insere1(X,N,[Y|L],[Y|L1]):-
    N1 is N-1,
    insere1(X,N1,L,L1).

cruzar(Ind1,Ind2,P1,P2,NInd11):-
    sublista(Ind1,P1,P2,Sub1),
    tarefas(NumT),
    R is NumT-P2,
    rotate_right(Ind2,R,Ind21),
    elimina(Ind21,Sub1,Sub2),
    P3 is P2 + 1,
    insere(Sub2,Sub1,P3,NInd1),
    eliminah(NInd1,NInd11).


eliminah([],[]).

eliminah([h|R1],R2):-!,
    eliminah(R1,R2).

eliminah([X|R1],[X|R2]):-
    eliminah(R1,R2).

mutacao([],[]).
mutacao([Ind|Rest],[NInd|Rest1]):-
    prob_mutacao(Pmut),
    random(0.0,1.0,Pm),
    ((Pm < Pmut,!,mutacao1(Ind,NInd));NInd = Ind),
    mutacao(Rest,Rest1).

mutacao1(Ind,NInd):-
    gerar_pontos_cruzamento(P1,P2),
    mutacao22(Ind,P1,P2,NInd).

mutacao22([G1|Ind],1,P2,[G2|NInd]):-
    !, P21 is P2-1,
    mutacao23(G1,P21,Ind,G2,NInd).
mutacao22([G|Ind],P1,P2,[G|NInd]):-
    P11 is P1-1, P21 is P2-1,
    mutacao22(Ind,P11,P21,NInd).

mutacao23(G1,1,[G2|Ind],G2,[G1|Ind]):-!.
mutacao23(G1,P,[G|Ind],G2,[G|NInd]):-
    P1 is P-1,
    mutacao23(G1,P1,Ind,G2,NInd).
%=============================================================================================================================
%                                                  FIM SECÃ‡AO GENÃ‰TICO
%=============================================================================================================================


%=============================================================================================================================
%                                                   SECÃ‡AO HEURÃSTICAS
%=============================================================================================================================
edd():-
    findall((Ind,M,TC,P),tarefa(Ind,M,TC,P),ListaTarefas),
    ordena_populacao(ListaTarefas,ListaTarefasOrdenada).
    

menorAtrasoEncomendaComPrioridades_SemShortestpath(Lm,T):-
                get_time(Ti),
                menorAtrasoEncomendaComPrioridades_SemShortestpath1(Lm,T),!,
                get_time(Tf),Tcomp is Tf-Ti,
                write('GERADO EM '),write(Tcomp),
                write(' SEGUNDOS'),nl.
 
menorAtrasoEncomendaComPrioridades_SemShortestpath1(Lm,T):- 
                          listaOrdenadaSemShortestPath(Lm),
                          avalia(Lm,T).
                         
menorAtrasoEncomendaComPrioridades_Shortestpath(Lm,T):-
                get_time(Ti),
                menorAtrasoEncomendaComPrioridades_Shortestpath1(Lm,T),!,
                get_time(Tf),Tcomp is Tf-Ti,
                write('GERADO EM '),write(Tcomp),
                write(' SEGUNDOS'),nl. 
 
menorAtrasoEncomendaComPrioridades_Shortestpath1(Lm,T):- 
                          listaOrdenadaShortestPath(Lm),
                          avalia(Lm,T).                      
                         

parPrioridadeTempoConclusaoSemShortestPath(IdTarefa,PesoPenalizacao-IdTarefa):-tarefa(IdTarefa,_,TConclusao,Prioridade), PesoPenalizacao is (TConclusao * ((15-Prioridade)/10)).
 
parPrioridadeTempoConclusaoShortestPath(IdTarefa,PesoPenalizacao-IdTarefa):-tarefa(IdTarefa,Makespan,_,Prioridade), PesoPenalizacao is (Makespan * ((15-Prioridade)/10)). 
 
listaOrdenadaSemShortestPath(S):- 
            findall(Id, tarefa(Id,_,_,_), L),
            maplist(parPrioridadeTempoConclusaoSemShortestPath,L,X), 
            keysort(X,Y),
            pairs_values(Y,S).
listaOrdenadaShortestPath(S):- 
            findall(Id, tarefa(Id,_,_,_), L), 
            maplist(parPrioridadeTempoConclusaoShortestPath,L,X),
            keysort(X,Y),
            pairs_values(Y,S).




geraListasdeTarefas(Lm,T):-
                get_time(Ti),
                geraListasdeTarefas1(Lm,T),!,
                get_time(Tf),Tcomp is Tf-Ti,
                write('GERADO EM '),write(Tcomp),
                write(' SEGUNDOS'),nl.
 
geraListasdeTarefas1(Lm,T):- 
                          listaOrdenada(Lm),
                          avalia(Lm,X).
                        %obterTarefasObjeto(X,T).
                         

parComTempoConclusao(IdTarefa,TConclusao-IdTarefa):-tarefa(IdTarefa,_,TConclusao,_).

listaOrdenada(S):- 
            findall(Id, tarefa(Id,_,_,_), L),
            maplist(parComTempoConclusao,L,X), 
            keysort(X,Y),
            pairs_values(Y,S).


%=============================================================================================================================
%                                                  FIM SECÃ‡AO HEURISTICAS
%=============================================================================================================================