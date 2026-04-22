<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;

use App\Model\M3uDto;
use App\Model\XtreamDto;
use App\Repository\PlaylistRepository;

#[Route('/api/v1/playlists')]
class PlaylistController extends AbstractController
{
    public function __construct(
        private readonly PlaylistRepository $playlistRepository,
    ) {}

    #[Route('/m3u', methods: ['POST'])]
    public function createM3u(#[MapRequestPayload] M3uDto $m3uDto): JsonResponse
    {
        $playlist = $this->playlistRepository->saveM3u(model: $m3uDto);
        return $this->json($playlist->toArray(), Response::HTTP_CREATED);
    }

    #[Route('/xtream', methods: ['POST'])]
    public function createXtream(#[MapRequestPayload] XtreamDto $xtreamDto): JsonResponse
    {
        $playlist = $this->playlistRepository->saveXtream(model: $xtreamDto);
        return $this->json($playlist->toArray(), Response::HTTP_CREATED);
    }

}
