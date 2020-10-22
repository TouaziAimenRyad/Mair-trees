# I.Information sur la structure:
Un arbre de recherche m-aires est la généralisation d'un arbre de
recherche binaire pour les ordres > 2 2 Un arbre de recherche m-aires
d'ordre n est un arbre où chaque noeud peut avoir au maximum n fils
(Fils [1...n]) et n-1 valeurs (Val [1...n-1]).

Les fils sont organisés en fonction des valeurs du noeuds, selon
les règles suivantes :
i) Le Fils [1] pointe un sous-arbre contenant des valeurs < à Val [1]
ii) Le Fils[i] pointe un sous-arbre contenant des valeurs > Val[i-1]
et < Val[i], pour i=2...n-1
iii) Le Fils[n] pointe un sous-arbre contenant des valeurs > Val[n-1] 