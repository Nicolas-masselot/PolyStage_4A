simpleApp.factory("toolsFactory", function () {
  return {
    // ce document contient les tools  comme notification et pagination

    // Notification
    notifySucess: function (msg) {
      alertify.set("notifier", "position", "bottom-left");
      alertify.success(msg);
    },

    notifyFailure: function (msg) {
      alertify.set("notifier", "position", "bottom-left");
      alertify.error(msg);
    },

    // Pagination
    setPagination: function (data, modify, DeleteStage) {
      const list_items = data;

      const list_element = document.getElementById("list");
      const pagination_element = document.getElementById("pagination");

      let current_page = 1;
      let rows = 5;

      DisplayList = function (items, wrapper, rows_per_page, page) {
        //wrapper.innerHTML = "";
        page--;

        let start = rows_per_page * page;
        let end = start + rows_per_page;
        let paginatedItems = items.slice(start, end);

        let tab = document.getElementById("table-body");

        $("#table-body").empty();

        for (var c = 0; c < paginatedItems.length; c++) {
          let stage = paginatedItems[c];
          //console.log(stage);

          var rowCnt = tab.rows.length; // table row count.
          var tr = tab.insertRow(rowCnt); // the table row.
          tr = tab.insertRow(rowCnt);

          let idstage = stage.idstage;

          var tabItems = [
            c + 1,
            stage.titrestage,
            stage.description,
            stage.niveau,
            stage.annee,
          ];

          tabItems.forEach((element, key) => {
            let td = document.createElement("td"); // table definition.
            td = tr.insertCell(key);
            // 2nd, 3rd and 4th column, will have textbox.
            //console.log(element);
            var para = document.createElement("p");
            var node = document.createTextNode(`${element}`);
            para.appendChild(node);
            td.appendChild(para);
          });
          // the first column.
          // add a button in every new row in the first column.

          let td = document.createElement("td"); // table definition.
          td = tr.insertCell(tabItems.length);

          var button = document.createElement("button");

          // set input attributes.
          button.setAttribute("type", "button");
          //button.setAttribute("value", "Modifier");
          button.setAttribute("class", "btn btn-info px-4");
          button.setAttribute("data-target", "#modifyModal");
          button.setAttribute("data-toggle", "modal");
          button.innerHTML =
            '<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>';

          // add button's 'onclick' event.
          button.setAttribute("onclick", `initModify(${idstage})`);

          td.appendChild(button);
          // the first column.
          // add a button in every new row in the first column.

          //td = tr.insertCell(tabItems.length+1);
          let supprimerbtn = document.createElement("button");

          // set input attributes.
          supprimerbtn.setAttribute("type", "button");
          supprimerbtn.setAttribute("value", "Supprimer");
          supprimerbtn.setAttribute("class", "btn btn-danger px-3");
          supprimerbtn.setAttribute("data-target", "#deleteModal");
          supprimerbtn.setAttribute("data-toggle", "modal");
          supprimerbtn.setAttribute("aria-hidden", "true");
          supprimerbtn.innerHTML =
            '<i class="fa fa-trash fa-lg" aria-hidden="true" ></i>';

          // add supprimerbtn's 'onclick' event.
          supprimerbtn.setAttribute("onclick", `initDeleteStage(${idstage})`);

          td.appendChild(supprimerbtn);
        }
      };

      SetupPagination = function (items, wrapper, rows_per_page) {
        wrapper.innerHTML = "";

        let page_count = Math.ceil(items.length / rows_per_page);
        for (let i = 1; i < page_count + 1; i++) {
          let btn = PaginationButton(i, items);
          wrapper.appendChild(btn);
        }
      };

      PaginationButton = function (page, items) {
        let button = document.createElement("button");
        button.innerText = page;

        if (current_page == page) button.classList.add("active");

        button.addEventListener("click", function () {
          current_page = page;
          DisplayList(items, list_element, rows, current_page);

          let current_btn = document.querySelector(
            ".pagenumbers button.active"
          );
          current_btn.classList.remove("active");

          button.classList.add("active");
        });

        return button;
      };

      initModify = function (idstage) {
        modify(idstage);
      };

      initDeleteStage = function (idstage) {
        DeleteStage(idstage);
      };

      DisplayList(list_items, list_element, rows, current_page);
      SetupPagination(list_items, pagination_element, rows);
    },
  };
});
