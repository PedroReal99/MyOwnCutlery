import {anything, instance, mock, verify, when} from 'ts-mockito';
import LoggerInstance from '../../Loaders/logger';
import {UserRepository} from '../../Repository/UserRepository';
import {User} from '../../Domain/User/User';
import {UserId} from '../../Domain/User/UserId/UserId';
import {UserService} from './UserService';
import {EncomendaRepository} from '../../Repository/EncomendaRepository';
import {UserMapper} from '../../Mapper/UserMapper';
import {Email} from '../../Domain/User/Email/Email';
import {Nome} from '../../Domain/User/Nome/Nome';
import {Prioridade} from '../../Domain/User/Prioridade/Prioridade';
import {Password} from '../../Domain/User/Password/Password';
import {Morada} from '../../Domain/User/Morada/Morada';
import {NIF} from '../../Domain/User/NIF/NIF';
import {Role} from '../../Domain/User/Role/Role';
import {UserDTO} from '../../DTO/UserDTO';

describe('UserService', () => {
    it('GetAll funciona', async () => {
        const repository: UserRepository = mock<UserRepository>();
        const encomendaRepository: EncomendaRepository = mock<EncomendaRepository>();
        const user: User = mock(User);
        const u = instance(user);
        u._id = UserId.valueOf('12344');
        u.email = Email.valueOf('email@email.com');
        u.nome = Nome.valueOf('ze');
        u.prioridade = Prioridade.valueOf(1);
        u.password = Password.valueOf('pass');
        u.morada = Morada.valueOf('rua');
        u.salt = undefined;
        u.nif = NIF.valueOf('000000000');
        u.role = Role.valueOf('cliente');

        const us = [];
        us.push(u);
        when(await repository.GetAll()).thenReturn(us);

        const service = new UserService(instance(repository), instance(encomendaRepository), LoggerInstance);
        const result = await service.getClientes();

        expect(result.pop()).toStrictEqual(UserMapper.domainToDto(u, ''));
    });

    it('GetById funciona', async () => {
        const repository: UserRepository = mock<UserRepository>();
        const encomendaRepository: EncomendaRepository = mock<EncomendaRepository>();
        const user: User = mock(User);
        const u = instance(user);
        u._id = UserId.valueOf('12344');
        u.email = Email.valueOf('email@email.com');
        u.nome = Nome.valueOf('ze');
        u.prioridade = Prioridade.valueOf(1);
        u.password = Password.valueOf('pass');
        u.morada = Morada.valueOf('rua');
        u.salt = undefined;
        u.nif = NIF.valueOf('000000000');
        u.role = Role.valueOf('cliente');
        when(await repository.GetById(anything())).thenReturn(u);

        const service = new UserService(instance(repository), instance(encomendaRepository), LoggerInstance);
        const result = await service.getById('12345');

        expect(result).toStrictEqual(UserMapper.domainToDto(u, ''));
    });

    it('GetById nao encontrada', async () => {
        const repository: UserRepository = mock<UserRepository>();
        const encomendaRepository: EncomendaRepository = mock<EncomendaRepository>();
        const user: User = mock(User);
        const u = instance(user);
        u._id = UserId.valueOf('12344');
        u.email = Email.valueOf('email@email.com');
        u.nome = Nome.valueOf('ze');
        u.prioridade = Prioridade.valueOf(1);
        u.password = Password.valueOf('pass');
        u.morada = Morada.valueOf('rua');
        u.salt = undefined;
        u.nif = NIF.valueOf('000000000');
        u.role = Role.valueOf('cliente');
        when(await repository.GetById(anything())).thenReturn(null);

        const service = new UserService(instance(repository), instance(encomendaRepository), LoggerInstance);

        await expect(service.getById('12345')).rejects.toThrow(Error('Utilizador não encontrado!'));
    });

    it('GetByEmail funciona', async () => {
        const repository: UserRepository = mock<UserRepository>();
        const encomendaRepository: EncomendaRepository = mock<EncomendaRepository>();
        const user: User = mock(User);
        const u = instance(user);
        u._id = UserId.valueOf('12344');
        u.email = Email.valueOf('email@email.com');
        u.nome = Nome.valueOf('ze');
        u.prioridade = Prioridade.valueOf(1);
        u.password = Password.valueOf('pass');
        u.morada = Morada.valueOf('rua');
        u.salt = undefined;
        u.nif = NIF.valueOf('888888888');
        u.role = Role.valueOf('cliente');
        const userDTO: UserDTO = {
            id: '12344',
            nome: 'ze',
            morada: 'rua',
            nif: '888888888',
            token: undefined,
            role: 'cliente',
        } as UserDTO;
        when(await repository.findByEmail(anything())).thenReturn(u);

        const service = new UserService(instance(repository), instance(encomendaRepository), LoggerInstance);
        const result = await service.getByEmail(userDTO);

        expect(result).toStrictEqual(UserMapper.domainToDto(u, 'login'));
    });

    it('GetByEmail nao encontrada', async () => {
        const repository: UserRepository = mock<UserRepository>();
        const encomendaRepository: EncomendaRepository = mock<EncomendaRepository>();
        const user: User = mock(User);
        const u = instance(user);
        u._id = UserId.valueOf('12344');
        u.email = Email.valueOf('email@email.com');
        u.nome = Nome.valueOf('ze');
        u.prioridade = Prioridade.valueOf(1);
        u.password = Password.valueOf('pass');
        u.morada = Morada.valueOf('rua');
        u.salt = undefined;
        u.nif = NIF.valueOf('000000000');
        u.role = Role.valueOf('cliente');
        const userDTO: UserDTO = {
            id: '12344',
            nome: 'ze',
            email: 'email@email.com',
            password: 'pass',
            morada: 'rua',
            nif: '888888888',
            token: undefined,
            role: 'cliente',
        };
        when(await repository.findByEmail(anything())).thenReturn(null);

        const service = new UserService(instance(repository), instance(encomendaRepository), LoggerInstance);

        await expect(service.getByEmail(userDTO)).rejects.toThrow(Error('Utilizador não encontrado!'));
    });

    it('Add funciona', async () => {
        const user: User = mock(User);
        const u = instance(user);
        u._id = UserId.valueOf('12344');
        u.email = Email.valueOf('email@email.com');
        u.nome = Nome.valueOf('ze');
        u.prioridade = Prioridade.valueOf(1);
        u.password = Password.valueOf('pass');
        u.morada = Morada.valueOf('rua');
        u.salt = undefined;
        u.nif = NIF.valueOf('000000000');
        u.role = Role.valueOf('cliente');
        const servico: UserService = mock<UserService>();
        const service = instance(servico);
        when(await servico.addCliente(anything())).thenReturn(UserMapper.domainToDto(u, ''));

        const result = await service.addCliente(UserMapper.domainToDto(u, ''));
        expect(result).toStrictEqual(UserMapper.domainToDto(u, ''));
    });

    it('Add falhou', async () => {
        const user: User = mock(User);
        const u = instance(user);
        u._id = UserId.valueOf('12344');
        u.email = Email.valueOf('email@email.com');
        u.nome = Nome.valueOf('ze');
        u.prioridade = Prioridade.valueOf(1);
        u.password = Password.valueOf('pass');
        u.morada = Morada.valueOf('rua');
        u.salt = undefined;
        u.nif = NIF.valueOf('000000000');
        u.role = Role.valueOf('cliente');
        const servico: UserService = mock<UserService>();
        const service = instance(servico);
        when(await servico.addCliente(anything())).thenThrow(Error('Erro na criação do cliente'));
        try {
            await service.addCliente(UserMapper.domainToDto(u, ''));
        } catch (e) {
            expect(e).toStrictEqual(Error('Erro na criação do cliente'));
        }
    });

    it('Update funciona', async () => {
        const repository: UserRepository = mock<UserRepository>();
        const encomendaRepository: EncomendaRepository = mock<EncomendaRepository>();
        const user: User = mock(User);
        const u = instance(user);
        u._id = UserId.valueOf('12344');
        u.email = Email.valueOf('email@email.com');
        u.nome = Nome.valueOf('ze');
        u.prioridade = Prioridade.valueOf(1);
        u.password = Password.valueOf('pass');
        u.morada = Morada.valueOf('rua');
        u.salt = undefined;
        u.nif = NIF.valueOf('000000000');
        u.role = Role.valueOf('cliente');
        const u2 = instance(user);
        u2._id = UserId.valueOf('12344');
        u2.email = Email.valueOf('email@email.com');
        u2.nome = Nome.valueOf('ze2');
        u2.prioridade = Prioridade.valueOf(1);
        u2.password = Password.valueOf('pass');
        u2.morada = Morada.valueOf('rua2');
        u2.salt = undefined;
        u2.nif = NIF.valueOf('000000000');
        u2.role = Role.valueOf('cliente');
        const userDTO: UserDTO = {
            id: '12344',
            nome: 'ze2',
            email: 'email@email.com',
            password: 'pass',
            morada: 'rua2',
            nif: '888888888',
            token: undefined,
            role: 'cliente',
        };
        when(await repository.Update(anything())).thenReturn(u2);

        const service = new UserService( instance(repository), instance(encomendaRepository), LoggerInstance);
        const result = await service.changeCliente(userDTO);

        expect(result).toStrictEqual(UserMapper.domainToDto(u2, ''));
    });

    it('Update falhou', async () => {
        const repository: UserRepository = mock<UserRepository>();
        const encomendaRepository: EncomendaRepository = mock<EncomendaRepository>();
        const user: User = mock(User);
        const u = instance(user);
        u._id = UserId.valueOf('12344');
        u.email = Email.valueOf('email@email.com');
        u.nome = Nome.valueOf('ze');
        u.prioridade = Prioridade.valueOf(1);
        u.password = Password.valueOf('pass');
        u.morada = Morada.valueOf('rua');
        u.salt = undefined;
        u.nif = NIF.valueOf('000000000');
        u.role = Role.valueOf('cliente');
        const userDTO: UserDTO = {
            id: '12344',
            nome: 'ze2',
            email: 'email@email.com',
            password: 'pass',
            morada: 'rua2',
            nif: '888888888',
            token: undefined,
            role: 'cliente',
        };
        when(await repository.Update(anything())).thenThrow(Error('Erro na atualização do cliente'));

        const service = new UserService( instance(repository), instance(encomendaRepository), LoggerInstance);
        try {
            await service.changeCliente(userDTO);
        } catch (e) {
            expect(e).toStrictEqual(Error('Erro na atualização do cliente'));
        }
    });

    it('Remove funciona', async () => {
        const repository: UserRepository = mock<UserRepository>();
        const encomendaRepository: EncomendaRepository = mock<EncomendaRepository>();
        const user: User = mock(User);
        const u = instance(user);
        u._id = UserId.valueOf('12344');
        u.email = Email.valueOf('email@email.com');
        u.nome = Nome.valueOf('ze');
        u.prioridade = Prioridade.valueOf(1);
        u.password = Password.valueOf('pass');
        u.morada = Morada.valueOf('rua');
        u.salt = undefined;
        u.nif = NIF.valueOf('000000000');
        u.role = Role.valueOf('cliente');
        when(await repository.Remove(anything())).thenReturn(u);

        const service = new UserService( instance(repository), instance(encomendaRepository), LoggerInstance);
        const result = await service.removeCliente('12344');

        expect(result).toStrictEqual(UserMapper.domainToDto(u, ''));
    });

    it('Remove nao encontrada', async () => {
        const repository: UserRepository = mock<UserRepository>();
        const encomendaRepository: EncomendaRepository = mock<EncomendaRepository>();
        const user: User = mock(User);
        const u = instance(user);
        u._id = UserId.valueOf('12344');
        u.email = Email.valueOf('email@email.com');
        u.nome = Nome.valueOf('ze');
        u.prioridade = Prioridade.valueOf(1);
        u.password = Password.valueOf('pass');
        u.morada = Morada.valueOf('rua');
        u.salt = undefined;
        u.nif = NIF.valueOf('000000000');
        u.role = Role.valueOf('cliente');
        when(await repository.Remove(anything())).thenReturn(null);

        const service = new UserService( instance(repository), instance(encomendaRepository), LoggerInstance);
        await expect(service.removeCliente('12344')).rejects.toThrow(Error('Utilizador não encontrado!'));
    });
});