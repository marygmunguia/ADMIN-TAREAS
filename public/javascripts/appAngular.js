angular
  .module("appTareas", ["ui.router"])

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("alta", {
        url: "/alta",
        templateUrl: "views/alta.html",
        controller: "ctrlAlta",
      })
      .state("editar", {
        url: "/editar/{id}",
        templateUrl: "views/editar.html",
        controller: "ctrlEditar",
      });
    $urlRouterProvider.otherwise("alta");
  })

  .factory("comun", function () {
    var comun = {};
    comun.tareas = [
      {
        nombre: "Comprar comida",
        prioridad: "1",
      },
      {
        nombre: "Almorzar con Mamá",
        prioridad: "2",
      },
      {
        nombre: "Ir al cine",
        prioridad: "0",
      },
    ];

    (comun.eliminar = function (tarea) {
      var indice = comun.tareas.indexOf(tarea);
      comun.tareas.splice(indice, 1);
    }),
      (comun.tarea = {});

    return comun;
  })

  .controller("ctrlAlta", function ($scope, $state, comun) {
    $scope.tarea = {};
    // $scope.tareas = [];

    $scope.tareas = comun.tareas;

    $scope.prioridades = ["Baja", "Normal", "Alta"];

    $scope.agregar = function () {
      $scope.tareas.push({
        nombre: $scope.tarea.nombre,
        prioridad: parseInt($scope.tarea.prioridad),
      });
    };

    $scope.masPrioridad = function (tarea) {
      tarea.prioridad += 1;
    };

    $scope.menosPrioridad = function (tarea) {
      tarea.prioridad -= 1;
    };

    $scope.eliminar = function (tarea) {
      comun.eliminar(tarea);
    };

    $scope.procesaObjeto = function (tarea) {
      comun.tarea = tarea;
      $state.go("editar");
    };
  })

  .controller("ctrlEditar", function ($scope, $state, comun) {
    $scope.tarea = comun.tarea;

    $scope.actualizar = function () {
      var indice = comun.tareas.indexOf(comun.tarea);
      comun.tareas[indice] = $scope.tarea;
      $state.go("alta");
    };

    $scope.eliminar = function () {
      comun.eliminar($scope.tarea);
      $state.go("alta");
    };
  });
