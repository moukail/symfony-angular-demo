<?php
namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Entity\User;

class UserFixtures extends Fixture
{
    public function __construct(private UserPasswordHasherInterface $passwordHasher) {}
    public function load(ObjectManager $manager): void
    {
        // Admin user
        $admin = new User();
        $admin->setEmail('admin@moukafih.nl');
        $admin->setPassword($this->passwordHasher->hashPassword($admin, 'pass_1234'));
        $admin->setRoles(['ROLE_ADMIN']);
        $manager->persist($admin);

        // Regular users for pagination
        for ($i = 1; $i <= 20; $i++) {
            $user = new User();
            $user->setEmail("user{$i}@moukafih.nl");
            $user->setPassword($this->passwordHasher->hashPassword($user, 'pass_1234'));
            $user->setRoles(['ROLE_USER']);
            $manager->persist($user);
        }

        $manager->flush();
    }
}
