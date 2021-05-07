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
    


    #[Route("/read", name:"api_todo_read", methods:["GET"])]
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



    #[Route("/create", name:"api_todo_create", methods:["POST"])]
    /**
     * Fonction qui va nous permettre de créer l'ensembles des pense-bête dans la bdd et ainsi les stocker
     * @param Request $request
     * @return JsonResponse
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
        } catch (\Exception $exception) {
            return $this->json([
                'message' => ['text' => ['Votre pense-bête n\'a pas pu être envoyé à la base de données ! '], 'level' => 'error']
            ]);
        }

        /** on retourne un message de confirmation */
        return $this->json([
            'todo' => $todo->toArray(),
            'message' => ['text' => ['Le Pense-bête a bien été créé ! ', 'Pense-bête : '.$content->text], 'level' => 'success']
        ]);
    }



    #[Route("/update/{id}", name:"api_todo_update", methods:["PUT"])]
    /**
     * Fonction qui va nous permettre de créer l'ensembles des pense-bête dans la bdd et ainsi les stocker
     * @param Request $request
     * @param Todo $todo
     * @return JsonResponse
     */
    public function update(Request $request, Todo $todo)
    {
        /** création d'une variable qui va permettre de décoder les données envoyé par axios post côté front-end ($request) 
         * et de les stocker dans la varible */
        $content = json_decode($request->getContent());

        /** on set le nouveau text mis à jour avec le setter de Todo.php */
        $todo->setText($content->text);

        /** update de la bdd avec les nouvelles données On push ces nouvelles données dans la bdd */
        try {
            /** On push ces nouvelles données dans la bdd */
            $this->entityManager->flush();
        } catch (\Exception $exception) {
            //error message
        }

        /** on retourne un message de confirmation dela mise à jour */
        return $this->json([
            'message' => 'Le pense-bête a été mis à jour.',
        ]);
    }



    #[Route("/delete/{id}", name:"api_todo_delete", methods:["DELETE"])]
    /**
     * Fonction qui va nous permettre la suppression d'un pense-bête de la bdd
     * @param Todo $todo
     * @return JsonResponse
     */
    public function delete(Todo $todo)
    {
        /** suppresion du pense-bête donc l'id correspond  */
        try {
            /** Opération de suppression du pense-bête */
            $this->entityManager->remove($todo);
            /** On push ces nouvelles données dans la bdd */
            $this->entityManager->flush();
        } catch (\Exception $exception) {
            //error message
        }

        /** on retourne un message de confirmation de la suppression */
        return $this->json([
            'message' => 'Le pense-bête a bien été supprimé.',
        ]);
    }

}
