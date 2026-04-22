<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

final class PlaylistControllerTest extends WebTestCase
{
    public function testIndex(): void
    {
        $client = static::createClient();
        $client->request('POST', '/api/v1/playlists/m3u', [
            'macAddress' => '00:1A:79:00:00:00',
            'url' => 'https://example.com/playlist.m3u'
        ]);
        $response = $client->getResponse();
        $this->assertEquals(201, $response->getStatusCode());
        $this->assertJson($response->getContent());
        
        $data = json_decode($response->getContent(), true);
        $this->assertArrayHasKey('id', $data);
        $this->assertArrayHasKey('macAddress', $data);
        $this->assertArrayHasKey('url', $data);
        $this->assertArrayHasKey('createdAt', $data);
        $this->assertArrayHasKey('updatedAt', $data);
    }
}
