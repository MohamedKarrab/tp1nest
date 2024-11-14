import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { randFullName, randFirstName, randUserName, randEmail, randPassword, randJobTitle, randNumber, randUrl, randUuid } from '@ngneat/falso'; // Importer les fonctions nécessaires
import { AppDataSource } from '../data-source';
import { User } from '../user/entities/user.entity';
import { Cv } from '../cv/entities/cv.entity';
import { Skill } from '../skill/entities/skill.entity';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);

    await AppDataSource.initialize();

    const userRepository = AppDataSource.getRepository(User);
    const cvRepository = AppDataSource.getRepository(Cv);
    const skillRepository = AppDataSource.getRepository(Skill);

    const users = Array.from({ length: 5 }, () => ({
        username: randUserName(),
        email: randEmail(),
        password: randPassword(),
    }));
    await userRepository.save(users);

    const skills = Array.from({ length: 10 }, () => ({
        Designation: randJobTitle(),
    }));
    await skillRepository.save(skills);

    const cvs = Array.from({ length: 5 }, () => ({
        name: randFullName(),
        firstname: randFirstName(),
        age: randNumber({ min: 20, max: 60 }),
        Cin: randUuid(),
        Job: randJobTitle(),
        path: randUrl(),
        user: users[Math.floor(Math.random() * users.length)],
        skills: skills.slice(0, 3),
    }));
    await cvRepository.save(cvs);

    await app.close();
}

bootstrap();
