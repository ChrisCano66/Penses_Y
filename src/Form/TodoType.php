<?php
 
namespace App\Form;
 
use App\Entity\Todo;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

// classe qui va permettre de vérifier les données apportées par le front-end
class TodoType extends AbstractType
{
    // Fonction qui permet de créer les restrictions liées aux données rentrée du côté front-end
    // le builder va vérifier les informations rentrées pour le nom et la description qui sont envoyés via axios depuis le front-end
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('task', TextType::class, [
                'constraints' => [
                    // on vérifie le fait que le champ pour le nom n'est pas vide et qu'au maximum il doit faire 35 charactères
                    new NotBlank(['message' => 'Le nom du pense-bête ne peut pas être vide !']),
                    new Length([
                        'min' => 1,
                        'max' => 35,
 
                        'minMessage' => 'Entrer au moins 1 charactère !',
                        'maxMessage' => 'Vous avez rentré {{ value }} mais vous ne pouvez en entrer qu\'au maximum {{ limit }} charactères !',
                    ])
                ]
            ])
            ->add('description', TextareaType::class, [
                'constraints' => [
                    // on vérifie le fait que le champ pour la description n'est pas vide et qu'au maximum il doit faire 500 charactères
                    new NotBlank(['message' => 'La description du pense-bête ne peut pas être vide !']),
                    new Length([
                        'min' => 1,
                        'max' => 500,
 
                        'minMessage' => 'Entrer au moins 1 charactère ',
                        'maxMessage' => 'Vous avez rentré {{ value }} mais vous ne pouvez en entrer qu\'au maximum {{ limit }} charactères !',
                    ])
                ]
            ])
        ;
    }
 
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Todo::class,
            /** Cross-Site Request Forgery */
            'csrf_protection' => false,
        ]);
    }
}
