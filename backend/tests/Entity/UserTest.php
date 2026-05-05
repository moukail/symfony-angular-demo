<?php

namespace App\Tests\Entity;

use App\Entity\User;
use PHPUnit\Framework\TestCase;
use ReflectionClass;

class UserTest extends TestCase
{
    public function testGettersAndSetters(): void
    {
        $user = new User();

        $reflection = new ReflectionClass(User::class);
        $property = $reflection->getProperty('id');
        $property->setValue($user, 123);
        $this->assertEquals(123, $user->getId());

        $user->setEmail('test@example.com');
        $this->assertEquals('test@example.com', $user->getEmail());
        $this->assertEquals('test@example.com', $user->getUserIdentifier());

        $user->setPassword('password123');
        $this->assertEquals('password123', $user->getPassword());

        $user->setRole('ROLE_USER');
        $this->assertEquals('ROLE_USER', $user->getRole());
        $this->assertEquals(['ROLE_USER'], $user->getRoles());

        $user->setRoles(['ROLE_ADMIN']);
        $this->assertEquals(['ROLE_ADMIN'], $user->getRoles());

        $this->assertInstanceOf(\DateTimeImmutable::class, $user->getCreatedAt());
        
        $user->setUpdatedAt();
        $this->assertInstanceOf(\DateTimeImmutable::class, $user->getUpdatedAt());
    }
}
