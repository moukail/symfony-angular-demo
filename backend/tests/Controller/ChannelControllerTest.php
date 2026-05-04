<?php

namespace App\Tests\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

final class ChannelControllerTest extends WebTestCase
{
    private function createAndPersistAdmin(): User
    {
        $uid = uniqid();
        $user = (new User())
            ->setEmail("admin_{$uid}@test.com")
            ->setPassword("hashed_pw_{$uid}")
            ->setRole('ROLE_ADMIN');

        $em = static::getContainer()->get('doctrine')->getManager();
        $em->persist($user);
        $em->flush();

        return $user;
    }

    public function testGetChannels(): void
    {
        $client = static::createClient();
        $client->request('GET', '/api/v1/channels');
        $this->assertResponseIsSuccessful();
        $this->assertJson($client->getResponse()->getContent());
    }

    public function testAddChannel(): void
    {
        $client = static::createClient();
        $user = $this->createAndPersistAdmin();
        $client->loginUser($user, 'api');

        $client->request('POST', '/api/v1/channels', [], [], ['CONTENT_TYPE' => 'application/json'], json_encode([
            'name' => 'Test Channel ' . uniqid(),
            'type' => 'TV',
            'country' => 'US',
            'language' => 'en',
            'website' => 'https://test.com',
            'logo' => 'https://test.com/logo.png',
            'active' => true,
        ]));
        $this->assertResponseStatusCodeSame(201);
        $this->assertJson($client->getResponse()->getContent());
    }

    public function testAddChannelUnauthorized(): void
    {
        $client = static::createClient();
        $client->request('POST', '/api/v1/channels', [], [], ['CONTENT_TYPE' => 'application/json'], json_encode([
            'name' => 'Test Channel',
            'type' => 'TV',
            'country' => 'US',
            'language' => 'en',
            'website' => 'https://test.com',
            'logo' => 'https://test.com/logo.png',
            'active' => true,
        ]));
        $this->assertResponseStatusCodeSame(401);
    }

    public function testUpdateChannel(): void
    {
        $client = static::createClient();
        $client->disableReboot();

        $user = $this->createAndPersistAdmin();
        $client->loginUser($user, 'api');

        // First create a channel
        $client->request('POST', '/api/v1/channels', [], [], ['CONTENT_TYPE' => 'application/json'], json_encode([
            'name' => 'Channel To Update ' . uniqid(),
            'type' => 'TV',
            'country' => 'US',
            'language' => 'en',
            'website' => 'https://test.com',
            'logo' => 'https://test.com/logo.png',
            'active' => true,
        ]));
        $this->assertResponseStatusCodeSame(201);
        $data = json_decode($client->getResponse()->getContent(), true);
        $id = $data['id'];

        // Then update it
        $client->request('PUT', "/api/v1/channels/$id", [], [], ['CONTENT_TYPE' => 'application/json'], json_encode([
            'name' => 'Updated Channel ' . uniqid(),
            'type' => 'Radio',
            'country' => 'NL',
            'language' => 'nl',
            'website' => 'https://updated.com',
            'logo' => 'https://updated.com/logo.png',
            'active' => true,
        ]));
        $this->assertResponseIsSuccessful();
    }

    public function testDeleteChannel(): void
    {
        $client = static::createClient();
        $client->disableReboot();

        $user = $this->createAndPersistAdmin();
        $client->loginUser($user, 'api');

        // First create a channel
        $client->request('POST', '/api/v1/channels', [], [], ['CONTENT_TYPE' => 'application/json'], json_encode([
            'name' => 'Channel To Delete ' . uniqid(),
            'type' => 'TV',
            'country' => 'US',
            'language' => 'en',
            'website' => 'https://test.com',
            'logo' => 'https://test.com/logo.png',
            'active' => true,
        ]));
        $this->assertResponseStatusCodeSame(201);
        $data = json_decode($client->getResponse()->getContent(), true);
        $id = $data['id'];

        // Then delete it
        $client->request('DELETE', "/api/v1/channels/$id");
        $this->assertResponseIsSuccessful();
    }
}
