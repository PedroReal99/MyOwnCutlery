import {anything, instance, mock, verify, when} from 'ts-mockito';
import {UsersRepository} from './User/Repository/UsersRepository.Repository';
import {User} from './User/Model/User.Models';
import { Name } from './Shared/Models/ValueObjects/Name.ValueObject';
import { Email } from './Shared/Models/ValueObjects/Email.ValueObject';
import {Password} from './Shared/Models/ValueObjects/Password.ValueObject';


interface NameProps {
    value: string;
}

describe('User', () => {
    it('GetAll funciona', async () => {
        const repository: UsersRepository = mock<UsersRepository>();
        const user:User = mock(User);
        const u = instance(user);
        u._id = 123456677;
        u.nif = 909090909;
        u.name = new Name("efv");
        u.password = new Password("jwdcsbjk");
        u.email = new Email("qqqqq@gmail.com");
        u.priority = 4;
        u.incapacity = "None";
        u.role = "client";

        const us = [];
        us.push(u);
        when(await repository.findAll()).thenReturn(us);

        const result = await repository.findAll;

        expect(result[0]===u);
    });

    it('GetById funciona', async () => {
        const repository: UsersRepository = mock<UsersRepository>();
        const user: User = mock(User);
        const u = instance(user);
        u._id = 123456677;
        u.nif = 909090909;
        u.name = new Name("efv");
        u.password = new Password("jwdcsbjk");
        u.email = new Email("qqqqq@gmail.com");
        u.priority = 4;
        u.incapacity = "None";
        u.role = "client";
        when(await repository.findById(anything())).thenReturn(u);

        var result = await repository.findById('1234');

        await expect(result===u);
    });


    it('GetByEmail funciona', async () => {
        const repository: UsersRepository = mock<UsersRepository>();
        const user: User = mock(User);
        const u = instance(user);
        u._id = 123456677;
        u.nif = 909090909;
        u.name = new Name("efv");
        u.password = new Password("jwdcsbjk");
        u.email = new Email("qqqqq@gmail.com");
        u.priority = 4;
        u.incapacity = "None";
        u.role = "client";
        when(await repository.findByEmail(anything())).thenReturn(u);

        const result = await repository.findByEmail(u.email.toString());

        expect(result.email===u.email);

    });


    it('Add funciona', async () => {
        const user: User = mock(User);
        const u = instance(user);
        const repository: UsersRepository = mock<UsersRepository>();
        u._id = 123456677;
        u.nif = 909090909;
        u.name = new Name("efv");
        u.password = new Password("jwdcsbjk");
        u.email = new Email("qqqqq@gmail.com");
        u.priority = 4;
        u.incapacity = "None";
        u.role = "client";
        when(await repository.createUser(anything())).thenReturn(u);
        const result = await repository.createUser(u);
        expect(result===u);
    });


    it('Remove funciona', async () => {
        const repository: UsersRepository = mock<UsersRepository>();
        const user: User = mock(User);
        const u = instance(user);
        u._id = 123456677;
        u.nif = 909090909;
        u.name = new Name("efv");
        u.password = new Password("jwdcsbjk");
        u.email = new Email("qqqqq@gmail.com");
        u.priority = 4;
        u.incapacity = "None";
        u.role = "client";
        when(await repository.delete(anything()));
    });
});