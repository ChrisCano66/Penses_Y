<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\TodoRepository;

#[Route('/api/todo', name: 'todo')]
class TodoController extends AbstractController
{
    /** 
     * @var $entityManager
     */
    private $entityManager;
    
    /** 
     * @var $todoRepository
     */
    private $todoRepository;
    
    
    /** constructeur de la class/controller qui aura besoin du manager d'entity pour récupérer les données de la base de données 
     * ainsi que le TodoRepository qui permet de faire les requêtes sql vers la base de données 
     */
    public function __construct(EntityManagerInterface $entityManager, TodoRepository $todoRepository)
    {
        /** On "initialise" les variables */
        $this->entityManager = $entityManager;
        $this->todoRepository = $todoRepository;
    }
    
    #[Route('/read', name: 'todo')]
    /** Fonction qui va nous permettre d'indexer l'ensembles des pense-bête présents dans la bdd et ainsi
     * les utiliser dans le front-end
     */
    public function index()
    {
        /** création d'une variable que reprendra toute la collection de pense-bête présents dans la bdd */
        $todos = $this->todoRepository->findAll();

        /** on met tous les pense-bête dans une array */
        $arrayOfTodos = [];
        foreach ($todos as $todo) {
            $arrayOfTodos[] = $todo->toArray();
        }
        /** transformation de l'array en json pour le front-end */
        return $this->json($arrayOfTodos);
    }
}
