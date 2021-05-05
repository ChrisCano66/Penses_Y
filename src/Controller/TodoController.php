<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\TodoRepository;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Todo;

#[Route('/api/todo', name: 'api_todo')]
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
    
    #[Route('/read', name: 'api_todo_read')]
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

    #[Route('/create', name: 'api_todo_create')]
    /**
     * Fonction qui va nous permettre de créer l'ensembles des pense-bête dans la bdd et ainsi les stocker
     * @param Request $request
     * @return void
     */
    public function create(Request $request)
    {
        /** création d'une variable qui va permettre de décoder les données envoyé par axios post côté front-end ($request) 
         * et de les stocker dans la varible */
        $content = json_decode($request->getContent());

        /** on crée un nouveau pense-bête */
        $todo = new Todo();

        /** on set le text avec le setter de Todo.php */
        $todo->setText($content->text);

        /** On va faire persister ces doinnées dans la bdd */
        try {
            /** persistance des données */
            $this->entityManager->persist($todo);
            /** update de la bdd avec les nouvelles données */
            $this->entityManager->flush();
            return $this->json([
                'todo' => $todo->toArray(),
            ]);
        } catch (\Exception $exception) {
            //error message
        }
    }
}
