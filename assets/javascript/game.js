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
  $(".available-characters").html("<div></div>");
  $(".your-character").html("<div></div>");
  for (name in characters) {
    loadCharacter(characters[name]);
  }

  $(".character").on("click", function() {
    character = characters[this.id];
    if (character.team === null) {
      character.team = "my";
    }
    $(".available-characters").html("<div></div>");
    $(".your-character").html("<div></div>");
    for (name in characters) {
      loadCharacter(characters[name]);
    }
  });
});
