<?php

namespace App\Entity;

use App\Repository\TodoRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=TodoRepository::class)
 */
class Todo
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * Correspond au nom du pense-bête mais peut servir "pavé de texte" pour le pense-bête 
     */
    private $text;

    /**
     * @ORM\Column(type="string", length=500)
     * Correspond à la description du pense-bête 
     */
    private $description;

    // Les différents getteur et setteur des différents attributs de la table Todo
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(string $text): self
    {
        $this->text = $text;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }
    
    /**
     * Fonction supplémentaire permettant de retourner une array avec l'id et le text d'un pense-bête apres une requête
     */
    public function toArray()
    {
        return ['id' => $this->id, 'text' => $this->text, 'description' => $this->description];
    }
}
