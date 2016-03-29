export const publicPage = () => {
  return {
    url: '/public',
    restrict: 'E',
    controllerAs: 'public',
    controller: PublicCtrl,
    template: require('./public.html'),
    scope: {},
    access: { restricted: false }
  }
}

class PublicCtrl {
  constructor($ngRedux, $state, Public) {
    $ngRedux.connect(this.mapStateToThis)(this);
    this.$state = $state;
    this.Public = Public;
    this.snippetList = [];
    this.loading = true;
    this.editorModalShow = false;
    this.Public.getPublicSnippets().then(res => {
      this.loading = false;
    });
  }

  toggleEditorModal(filepath) {
    this.Public.setSelectedPublicSnippet(filepath);
    this.editorModalShow = !this.editorModalShow;
  }

  openSnippet(filepath) {
    this.Public.setSelectedPublicSnippet(filepath);
    this.$state.go('main.editor.snippets');
  }

  mapStateToThis(state) {
    let { publicList, selectedPublicSnippet } = state;
    let snippetArr = Object.keys(publicList).map(key => {
      return publicList[key];
    })
    return {
      publicList,
      snippetArr,
      selectedPublicSnippet
    }
  }
}