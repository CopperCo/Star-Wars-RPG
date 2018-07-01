function newCharacter(name, imagePath, hp, attack, defend) {
  return {
    name: name,
    image: imagePath,
    hp: hp,
    attackScore: attack,
    defendScore: defend,
    baseAttack: attack,
    team: null
  };
}

function loadCharacter(character) {
  if (character.team === null) {
    $(".available-characters").append(
      "<div class='col-md-3 character' id='" +
        character.name +
        "'><p> " +
        character.name +
        "</p><img src=" +
        character.image +
        "><p>" +
        character.hp +
        "</p></div>"
    );
  }
  if (character.team === "my") {
    $(".your-character").append(
      "<div class='col-md-3 character' id='" +
        character.name +
        "'><p> " +
        character.name +
        "</p><img src=" +
        character.image +
        "><p>" +
        character.hp +
        "</p></div>"
    );
  }
  if (character.team === "enemies") {
    $(".enemies").append(
      "<div class='col-md-3 enemy' id='" +
        character.name +
        "'><p> " +
        character.name +
        "</p><img src=" +
        character.image +
        "><p>" +
        character.hp +
        "</p></div>"
    );
  }
  if (character.team === "defender") {
    $(".defender-holder").append(
      "<div class='col-md-3 defender' id='" +
        character.name +
        "'><p> " +
        character.name +
        "</p><img src=" +
        character.image +
        "><p>" +
        character.hp +
        "</p></div>"
    );
  }
}

var characters = {
  Rey: newCharacter("Rey", "assets/images/Rey.jpg", 150, 5, 3),
  Luke: newCharacter("Luke", "assets/images/Luke-Skywalker.jpg", 120, 10, 1),
  "Kylo-Ren": newCharacter(
    "Kylo-Ren",
    "assets/images/Kylo-Ren.jpg",
    180,
    12,
    5
  ),
  Snoke: newCharacter("Snoke", "assets/images/Snoke.jpg", 80, 1, 1)
};

$(document).ready(function() {
  for (name in characters) {
    loadCharacter(characters[name]);
  }

  // $(".character").on("click", function() {
  //   character = characters[this.id];
  //   character.team = "my";
  //   $(".available-characters").html("<div></div>");
  //   for (name in characters) {
  //     console.log(characters[name]);
  //     if (characters[name].team != "my") {
  //       characters[name].team = "enemies";
  //     }
  //     loadCharacter(characters[name]);
  //   }
  //   $(".enemy").on("click", function() {
  //     console.log(this.id);
  //     characters[this.id].team = "defender";
  //     loadCharacter(characters[this.id]);
  //   });
  // });

  function selectDefender() {
    characters[this.id].team = "defender";
    $("#" + this.id)
      .detach()
      .appendTo(".defender-holder")
      .attr("class", "col-md-3 defender");
  }

  function selectCharacter() {
    characters[this.id].team = "my";
    $("#" + this.id)
      .detach()
      .unbind()
      .appendTo(".your-character")
      .attr("class", "col-md-3 fighter");
    for (name in characters) {
      console.log(name);
      if (characters[name].team != "my") {
        characters[name].team = "enemies";
        $("#" + name)
          .detach()
          .appendTo(".enemies")
          .attr("class", "col-md-3 enemy")
          .unbind()
          .click(selectDefender);
      }
    }
  }

  function fight() {
    characters[name].attackScore = attackScore * 2;
  }

  $(".character").on("click", selectCharacter);

  $("#attackBtn").on("click", function() {
    alert("You attacked");
    fight();
  });
});
