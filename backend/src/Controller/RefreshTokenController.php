<?php

namespace App\Controller;

use Gesdinet\JWTRefreshTokenBundle\Model\RefreshTokenManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\User\UserProviderInterface;

class RefreshTokenController extends AbstractController
{
    public function refresh(
        Request $request,
        RefreshTokenManagerInterface $refreshTokenManager,
        JWTTokenManagerInterface $jwtManager,
        UserProviderInterface $appUserProvider
    ): Response {
        $data = json_decode($request->getContent(), true);
        $refreshTokenString = $data['refresh_token'] ?? null;

        if (!$refreshTokenString) {
            error_log('Refresh token missing from request body');
            return new JsonResponse(['message' => 'Refresh token missing'], Response::HTTP_BAD_REQUEST);
        }

        $refreshToken = $refreshTokenManager->get($refreshTokenString);

        if (!$refreshToken) {
            error_log('Refresh token not found in database: ' . substr($refreshTokenString, 0, 10) . '...');
            return new JsonResponse(['message' => 'Refresh token not found'], Response::HTTP_UNAUTHORIZED);
        }

        if (method_exists($refreshToken, 'isValid') && !$refreshToken->isValid()) {
            return new JsonResponse(['message' => 'Refresh token expired'], Response::HTTP_UNAUTHORIZED);
        }

        // For older versions or custom entities, check datetime
        if (method_exists($refreshToken, 'getValid') && $refreshToken->getValid() < new \DateTime()) {
            return new JsonResponse(['message' => 'Refresh token expired'], Response::HTTP_UNAUTHORIZED);
        }

        $user = $appUserProvider->loadUserByIdentifier($refreshToken->getUsername());
        
        if (!$user) {
            return new JsonResponse(['message' => 'User not found'], Response::HTTP_UNAUTHORIZED);
        }

        $token = $jwtManager->create($user);

        return new JsonResponse([
            'token' => $token,
            'refresh_token' => $refreshToken->getRefreshToken(),
        ]);
    }
}
