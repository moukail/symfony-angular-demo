<?php

namespace App\Tests\Entity;

use App\Entity\User;
use PHPUnit\Framework\TestCase;

class UserTest extends TestCase
{
    public function testGettersAndSetters(): void
    {
        $user = new User();

        $user->setEmail('test@example.com');
        $this->assertEquals('test@example.com', $user->getEmail());
        $this->assertEquals('test@example.com', $user->getUserIdentifier());

        $user->setPassword('password123');
        $this->assertEquals('password123', $user->getPassword());

        $user->setRole('ROLE_USER');
        $this->assertEquals('ROLE_USER', $user->getRole());
        $this->assertEquals(['ROLE_USER'], $user->getRoles());

        $this->assertInstanceOf(\DateTimeImmutable::class, $user->getCreatedAt());
        $this->assertInstanceOf(\DateTimeImmutable::class, $user->getUpdatedAt());
    }
}
