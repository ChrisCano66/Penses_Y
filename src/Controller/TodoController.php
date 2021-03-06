<?php

namespace App\Controller;

use App\Entity\Todo;
use App\Form\TodoType;
use App\Repository\TodoRepository;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

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

        /** Création d'un form symfony pour la vérifaication des données (TodoType.php) */        
        $form = $this->createForm(TodoType::class);
        /** formatage du contenu sous forme d'array */
        $nonObject = (array)$content;
        /** on enlève la partie liée à l'ID */
        unset($nonObject['id']);
        /** on soumet le contenu à validation */
        $form->submit($nonObject);
 
        /** si ce la validation n'est pas validée */
        if (!$form->isValid()) {
            /** on récupères les erreurs sous forme d'array */
            $errors = [];
            /** on récupère les messages liées aux erreurs */
            /** getErrors(depp = true, flatten = true) */
            foreach ($form->getErrors(true, true) as $error) {
                /** on récupère si c'est une task ou une desccription */
                $propertyName = $error->getOrigin()->getName();
                /** on récupère le message d'erreur liés */
                $errors[$propertyName] = $error->getMessage();
            }
            /** on retourne le message d'erreur en joignant les deux parties (nom + message) récupérées */
            return $this->json([
                'message' => ['text' => join("\n", $errors), 'level' => 'error'],
            ]); 
        }

        /** on set le text avec le setter de Todo.php */
        $todo->setTask($content->task);
        $todo->setDescription($content->description);

        /** On va faire persister ces doinnées dans la bdd */
        try {
            /** persistance des données */
            $this->entityManager->persist($todo);
            /** update de la bdd avec les nouvelles données */
            $this->entityManager->flush();
        } catch (\Exception $exception) {
            return $this->json([
                'message' => ['text' => 'Impossible de joindre la Base de données afin de rajouter le Pense-bête !', 'level' => 'error']
            ]);
        }

        /** on retourne un message de confirmation */
        return $this->json([
            'todo' => $todo->toArray(),
            'message' => ['text' => 'Le Pense-bête a bien été créé !', 'level' => 'success']
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

        /** Création d'un form symfony pour la vérifaication des données (TodoType.php) */        
        $form = $this->createForm(TodoType::class);
        /** formatage du contenu sous forme d'array */
        $nonObject = (array)$content;
        /** on enlève la partie liée à l'ID */
        unset($nonObject['id']);
        /** on soumet le contenu à validation */
        $form->submit($nonObject);
 
        /** si ce la validation n'est pas validée */
        if (!$form->isValid()) {
            /** on récupères les erreurs sous forme d'array */
            $errors = [];
            /** on récupère les messages liées aux erreurs */
            /** getErrors(depp = true, flatten = true) */
            foreach ($form->getErrors(true, true) as $error) {
                /** on récupère si c'est une task ou une desccription */
                $propertyName = $error->getOrigin()->getName();
                /** on récupère le message d'erreur liés */
                $errors[$propertyName] = $error->getMessage();
            }
            /** on retourne le message d'erreur en joignant les deux parties (nom + message) récupérées */
            return $this->json([
                'message' => ['text' => join("\n", $errors), 'level' => 'error'],
            ]);
 
        }

        // On compare les données de la BDD avec les nouvelles donées que l'on veut mettre a jour pour le pense-bête sélectionné
        // s'il n'y apas de changement (aussi bien pour le nom du pense-bête que pour la description) on renvoit un message 
        // indiquant qu'il n'y apas eu de changement et donc qu'il n'est pas nécessaire de faire la mise à jour du pense-bête
        if ($todo->getTask() === $content->task && $todo->getDescription() === $content->description) {
            return $this->json([
                'message' => ['text' => 'Il n\'y a pas eu de changement (titre ou description) dans le Pense-bête !', 'level' => 'error'],
            ]);
        }

        /** on set le nouveau text mis à jour avec le setter de Todo.php */
        $todo->setTask($content->task);
        $todo->setDescription($content->description);

        /** update de la bdd avec les nouvelles données On push ces nouvelles données dans la bdd */
        try {
            /** On push ces nouvelles données dans la bdd */
            $this->entityManager->flush();
        } catch (\Exception $exception) {
            return $this->json([
                'message' => ['text' => 'Impossible de joindre la Base de données afin de mettre à jour le Pense-bête !', 'level' => 'error']
            ]);
        }

        /** on retourne un message de confirmation dela mise à jour */
        return $this->json([
            'todo' => $todo->toArray(),
            'message' => ['text' => 'Le pense-bête a été mis à jour.', 'level' => 'success']
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
            return $this->json([
                'message' => ['text' => 'Impossible de joindre la Base de données afin de supprimer le Pense-bête !', 'level' => 'error']
            ]);
        }

        /** on retourne un message de confirmation de la suppression */
        return $this->json([
            'message' => ['text' => 'Le pense-bête a bien été supprimé.', 'level' => 'success']
        ]);
    }

}
