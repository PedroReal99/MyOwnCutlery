%:- initialization (cria_op_enc ).
%:- initialization ( cria_ops([t(Cliente,Prod,Qt,TConc)|LT],N) ).
%:- initialization ( cria_ops_prod_cliente([Opt|LOpt],Client,Prod,Qt,TConc,N,Nf) ).

% % FÁBRICA
% 
% Linhas
linhas([lA,lB,lC]).

% % Maquinas
maquinas([ma,mb,mc,md,me,mf,mg,mh]).

% Ferramentas
ferramentas([fa,fb,fc,fd,fe]).


% Maquinas que constituem as Linhas
tipos_maq_linha(lA,[ma,mc,md]).
tipos_maq_linha(lB,[mb,mh,me]).
tipos_maq_linha(lC,[mf,mg]).

% Operações
tipo_operacoes([opt1,opt2,opt3,opt4,opt5,opt6,opt7,opt8,opt9,opt10]).

% operacoes/1 deve ser criado dinamicamente
operacoes([op1,op2,op3,op4,op5]).

%operacoes_atrib_maq depois deve ser criado dinamicamente
operacoes_atrib_maq(ma,[op1,op2,op3,op4,op5]).

% classif_operacoes/2 deve ser criado dinamicamente %%atomic_concat(op,NumOp,Resultado)

classif_operacoes(op1,opt1).
classif_operacoes(op2,opt2).
classif_operacoes(op3,opt1).
classif_operacoes(op4,opt2).
classif_operacoes(op5,opt3).
%classif_operacoes(op6,opt1).
%classif_operacoes(op7,opt2).
%classif_operacoes(op8,opt1).
%classif_operacoes(op9,opt2).
%classif_operacoes(op10,opt3).
%classif_operacoes(op11,opt2).
%classif_operacoes(op12,opt1).
%classif_operacoes(op13,opt3).

% Afetação de tipos de operações a tipos de máquinas com ferramentas, tempos de setup e tempos de execucao)
operacao_maquina(opt1,ma,fa,5,60).
operacao_maquina(opt2,ma,fb,6,30).
operacao_maquina(opt3,ma,fc,8,40).

% PRODUTOS
produtos([pA,pB,pC,pD,pE,pF,pG,pH]).

operacoes_produto(pA,[opt1]).
operacoes_produto(pB,[opt2]).
operacoes_produto(pC,[opt3]).
operacoes_produto(pD,[opt1,opt2,opt3]).


% ENCOMENDAS
%Clientes
clientes([clA,clB,clC,clD,clE]).

% prioridades dos clientes
prioridade_cliente(clA,2).
prioridade_cliente(clB,1).
prioridade_cliente(clC,5).

% Encomendas do cliente,termos e(<produto>,<n.unidades>,<tempo_conclusao>)
encomenda(clA,[e(pA,1,100),e(pB,1,100)]).
encomenda(clB,[e(pA,1,110),e(pB,1,150),e(pC,1,300)]).
encomenda(clC,[e(pA,3,300),e(pB,10,1000),e(pC,2,2000)]).
encomenda(clD,[e(pB,4,700),e(pD,2,700),e(pC,5,1000)]).

op_prod_client(op1,ma,fa,pA,clA,1,100,5,60).
op_prod_client(op2,ma,fb,pB,clA,1,100,6,30).
op_prod_client(op3,ma,fa,pA,clB,1,110,5,60).
op_prod_client(op4,ma,fb,pB,clB,1,150,6,30).
op_prod_client(op5,ma,fc,pC,clB,1,300,8,40).
%op_prod_client(op6,ma,fa,pA,clA,1,300,5,60).
%op_prod_client(op7,ma,fb,pB,clA,1,350,6,30).
%op_prod_client(op8,ma,fa,pA,clB,1,360,5,60).
%op_prod_client(op9,ma,fb,pB,clB,1,400,6,30).
%op_prod_client(op10,ma,fc,pC,clB,1,500,8,40).
%op_prod_client(op11,ma,fb,pB,clA,1,550,6,30).
%op_prod_client(op12,ma,fa,pA,clA,1,600,5,60).
%p_prod_client(op13,ma,fc,pC,clB,1,615,8,40).

% Separar posteriormente em varios ficheiros
% permuta/2 gera permutações de listas
permuta([ ],[ ]).
permuta(L,[X|L1]):-apaga1(X,L,Li),permuta(Li,L1).

apaga1(X,[X|L],L).
apaga1(X,[Y|L],[Y|L1]):-apaga1(X,L,L1).

% permuta_tempo/3 faz uma permutação das operações atribuídas a uma maquina e calcula tempo de ocupação incluindo trocas de ferramentas
permuta_tempo(M,LP,Tempo):- operacoes_atrib_maq(M,L),
permuta(L,LP),soma_tempos(semfer,M,LP,Tempo).

soma_tempos(_,_,[],0).
soma_tempos(Fer,M,[Op|LOp],Tempo):- classif_operacoes(Op,Opt),
    operacao_maquina(Opt,M,Fer1,Tsetup,Texec),
    soma_tempos(Fer1,M,LOp,Tempo1),
    ((Fer1==Fer,!,Tempo is Texec+Tempo1);
            Tempo is Tsetup+Texec+Tempo1).

%m) ficha 5 cria_op_enc/0 - Cria factos relacionados com as opera  es a partir das encomendas

%:- dynamic classif_operacoes/2.
%:- dynamic operacoes_atrib_maq/2.
%:- dynamic op_prod_client/9.

cria_op_enc:-findall(t(Cliente,Prod,Qt,TConc),
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
    cria_ops_prod_cliente(LOpt,Prod,Cliente,Qt,TConc,N,N1),
            cria_ops(LT,N1).

cria_ops_prod_cliente([],_,_,_,_,Nf,Nf).
cria_ops_prod_cliente([Opt|LOpt],Client,Prod,Qt,TConc,N,Nf):-
            Ni is N+1,  
            atomic_concat(op,Ni,Op),
            assertz(classif_operacoes(Op,Opt)),
            operacao_maquina(Opt,M,F,Tsetup,Texec),
    assertz(op_prod_client(Op,M,F,Prod,Client,Qt,TConc,Tsetup,Texec)),
    cria_ops_prod_cliente(LOpt,Client,Prod,Qt,TConc,Ni,Nf).
%:-cria_op_enc.

%------------------------------------------------------------EXERCICIO 1-------------------------------------------------------------
%1.1-gerar sequenciamentos de operações para 1 máquina considerando tempos de setup (preparação da máquina com a ferramenta necessária) e tentar encontrar o melhor sequenciamento segundo o critério de menor tempo de execução
%Dado uma máquina retorna uma lista de operações e o tempo de ocupação
%%parametros:
%           - M:maquina
%           -L lista Operações da maquina 
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
% Cria uma lista de operacoes ordenada alfabeticamente pelas ferramentas das operações
% M- Maquina
% LO- lista de operaceos da maquina
% SLK- lista ordenada pelas keys
% S- lista resultante ordenada 
% PL- lista de pares operacoes ferramentas 
ordenaOperacoesPorFerramenta(M,S):- operacoes_atrib_maq(M,LO), maplist(parOperacaoFerramenta,LO,PL), keysort(PL,SLK), pairs_values(SLK,S).
% Calcula tempo de ocupação de uma lista de operações
% F- ferramenta
% Lista no segundo parametro: lista que contem as operações ordenandas pela ferramenta
% T- variavel que irá conter o somatório do tempo de ocupação das operações
tempoOcupacao(_,[],0).
tempoOcupacao(F,[H|L],T):- op_prod_client(H,_,F1,_,_,_,_,Tset,Texec), tempoOcupacao(F1,L,T1),
                            ((F1==F,!,T is Texec+T1);T is Tset+Texec+T1).
 
% 1.2-Dado uma máquina retorna uma lista de operações e a soma dos tempos de atraso
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
% S- lista contendo as operações ordenadas pelo prazo
% Y- lista ordenada pelas keys
% L- lista de operaceos da maquina
% X- lista de pares operacoes prazo 
ordenaOperacoesPorPrazo(M,S):- operacoes_atrib_maq(M,L), maplist(parPrazoOperacao,L,X), keysort(X,Y), pairs_values(Y,S).
% Calcula soma dos tempos de atraso de uma lista de operações
% % F- ferramenta
% Lista no segundo parametro: lista que contem as operações ordenandas pelo prazo
% T- variavel que irá conter o somatório do tempo de atraso das operações
% Tocupacao- variavel que guarsa o tempo de ocupação
% Tatraso- variavel que guarsa o tempo de atrasp
tempoAtraso(_,[],T,_,Tatraso):- T is Tatraso,!.
tempoAtraso(F,[O|L],T,Tocupacao,Tatraso):- op_prod_client(O,_,F1,_,_,_,Prazo,Tset,Texec),
                            ((F==F1,!,To1 is Tocupacao + Texec);To1 is Tocupacao+Texec+Tset),
                            ((To1<Prazo,!,Ta1 is Tatraso);Ta1 is To1-Prazo+Tatraso),
                            tempoAtraso(F1,L,T,To1,Ta1).
 
%----------------------------------------------------EXERCICIO 2-------------------------------------------------------------

% melhor escalonamento com findall, gera todas as solucoes e escolhe melhor

% ------------------------------------------------TEMPO OCUPAÇÃO-----------------------------------------------------------
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




%------------------------------------------------- A STAR -----------------------------------------------------
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

%A*
%Tempo ocupacao


aStarTC(Maq,CamRev,Cust):-operacoes_atrib_maq(Maq,LFaltam),    %Vai buscar as operações da maquina e adiciona a lista LFaltam
    					aStarTC2([(_,0,[],LFaltam)],CamRev,Cust).  %O 1º argumento da lista é o custo acumulado(custo total + estimativa),custo total,Caminho e as operações que faltam...



aStarTC2([(_,_,CaminhoReverter,[])|_],CamRev,_):-reverse(CaminhoReverter,CamRev). 

aStarTC2([(_,CustoAtual,LFeito,LFaltam)|Outros],Cam,Custo):-
           findall((CEX,CaX,[HFeito|LFeito],LOpe), %Conforme a lista verifica as operacoes para onde pode ir
         	(
			LFaltam\==[],
            apaga1(HFeito,LFaltam,LOpe),
            
            obterTemposPorOperacao(HFeito,M,F,Ts,Te),
			(   (verificarFerramenta(M,F,LFeito),!,CX is 0);CX is Ts), %CX corresponde ao tempo de set up conforme as operacoes
			CaX is CX + CustoAtual,
         	estimativa(LOpe,EstX),
         	CEX is CaX + EstX),
    	Novos),
		append(Outros,Novos,Todos),
		sort(Todos,TodosOrd),
		aStarTC2(TodosOrd,Cam,Custo).
				
obterTemposPorOperacao(Op1,M,F,Ts,Te):-
	classif_operacoes(Op1,Opt1), %obtem o tipo de operacao conforme a operacao
	operacao_maquina(Opt1,M,F,Ts,Te). % obtem e retorna nas variaveis Ts maquina e ferramenta
	

verificarFerramenta(M,F,[Op2|ROperacoes]):-	
	obterTemposPorOperacao(Op2,_,F,_,_). % verifica se a ferramenta F e igual a ferramenta da Op2 
         
val(M1,M2,Ts,C):-
    ((M1==M2), C is 0; C is Ts).


%------------------------------------------------------A Star Somatorio


aStarS(Maq,CamRev,Cust):-operacoes_atrib_maq(Maq,LFaltam),    %Vai buscar as operações da maquina e adiciona a lista LFaltam
    					aStarS2([(_,0,[],LFaltam)],CamRev,Cust).  %O 1º argumento da lista é o custo acumulado(custo total + estimativa),custo total,Caminho e as operações que faltam...



aStarS2([(_,_,CaminhoReverter,[])|_],CamRev,_):-reverse(CaminhoReverter,CamRev). 

aStarS2([(_,CustoAtual,LFeito,LFaltam)|Outros],Cam,Custo):-
           findall((CEX,CaX,[HFeito|LFeito],LOpe), %Conforme a lista verifica as operacoes para onde pode ir
         	(
			LFaltam\==[],
            apaga1(HFeito,LFaltam,LOpe),
            
            obterTemposPorOperacao(HFeito,M,F,Ts,Te),
            op_prod_client(HFeito,M,F,_,_,_,To,_,_),
			(   (verificarFerramenta(M,F,LFeito),!,CX is Te);CX is Ts+Te), %CX corresponde ao tempo de set execucao ou + tempo setup caso sejam difernetes conforme as operacoes
			setExeParaList(LFeito,CSE,F),
            Atr is To-CSE,
            
            CaX is Atr + CustoAtual,
                
         	estimativaS(LOpe,EstX,CustoAtual),
         	CEX is CaX + EstX),
    	Novos),
		append(Outros,Novos,Todos),
		sort(Todos,TodosOrd),
		aStarS2(TodosOrd,Cam,Custo).

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

setExeParaList([],0,F).
setExeParaList([Op1|LFeito],CSE,F):-
    	op_prod_client(Op1,M,F1,_,_,_,_,Ts,Te),
		((F==F1,!,CEst is Te);CEst is Ts+Te),
		setExeParaList(LFeito, Custo1,F1),
		CSE is Custo1 + CEst.