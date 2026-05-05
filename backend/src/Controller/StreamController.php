<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\Channel;
use App\Entity\Stream;
use App\Model\StreamDto;
use App\Repository\StreamRepository;

class StreamController extends AbstractController
{
    public function __construct(private readonly StreamRepository $streamRepository)
    {}

    #[Route('/api/v1/channels/{id}/streams', name: 'app_streams', methods: ['GET'])]
    public function index(Channel $channel): JsonResponse
    {
        return $this->json($channel->getStreams(), Response::HTTP_OK, [], [
            'groups' => ['user'],
        ]);
    }

    #[Route('/api/v1/channels/{channel}/streams', name: 'app_stream_add', methods: ['POST'])]
    #[IsGranted('ROLE_ADMIN')]
    public function add(Channel $channel, #[MapRequestPayload] StreamDto $stream): JsonResponse
    {

        $result = $this->streamRepository->save((new Stream())
            ->setChannel($channel)
            ->setMimeType($stream->mimeType)
            ->setSource($stream->source)
            ->setType($stream->type)
            ->setUrl($stream->url)
            //->setDrm($stream->drm)
        );
        return $this->json($result, Response::HTTP_CREATED, [], ['groups' => ['user']]);
    }

    #[Route('/api/v1/channels/{channel}/streams/{id}', name: 'app_stream_delete', methods: ['DELETE'])]
    #[IsGranted('ROLE_ADMIN')]
    public function delete(Channel $channel, Stream $stream): JsonResponse
    {
        $this->streamRepository->remove($stream);
        return $this->json($stream, Response::HTTP_OK, [], ['groups' => ['user']]);
    }
}