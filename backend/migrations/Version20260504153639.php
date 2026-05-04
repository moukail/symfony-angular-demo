<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260504153639 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE channel (id BINARY(16) NOT NULL, name VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, country VARCHAR(50) NOT NULL, language VARCHAR(50) NOT NULL, website VARCHAR(255) DEFAULT NULL, logo LONGTEXT DEFAULT NULL, active TINYINT NOT NULL, identifier VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_IDENTIFIER_NAME (name), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE stream (id BINARY(16) NOT NULL, drm TINYINT NOT NULL, drm_license LONGTEXT DEFAULT NULL, mime_type VARCHAR(255) NOT NULL, source VARCHAR(50) NOT NULL, type LONGTEXT NOT NULL, url LONGTEXT NOT NULL, channel_id BINARY(16) DEFAULT NULL, INDEX IDX_F0E9BE1C72F5A1AA (channel_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE stream ADD CONSTRAINT FK_F0E9BE1C72F5A1AA FOREIGN KEY (channel_id) REFERENCES channel (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE stream DROP FOREIGN KEY FK_F0E9BE1C72F5A1AA');
        $this->addSql('DROP TABLE channel');
        $this->addSql('DROP TABLE stream');
    }
}
