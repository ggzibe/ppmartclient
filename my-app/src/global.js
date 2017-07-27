export default class Global {

  globalObj(){
    const isNode = typeof process === 'object' && process.versions && !!process.versions.node;
    return isNode ? global : window;
 }

  hasCurrentUser(){
    if(this.globalObj().sessionStorage !== null && this.globalObj().sessionStorage !== undefined && this.globalObj().sessionStorage.length > 0){
      return this.globalObj().sessionStorage.getItem('users') !== null;
    }
    else{
      return false;
    }
  }

  getCurrentUser(){
    if(this.globalObj().sessionStorage !== null && this.globalObj().sessionStorage !== undefined && this.globalObj().sessionStorage.length > 0 && this.globalObj().sessionStorage.getItem('users') !== null){
      const users = this.globalObj().sessionStorage.getItem('users');
      return JSON.parse(users);
    }
    else{
        return null;
    }
  }

  setCurrentUser(data){
    this.globalObj().sessionStorage.setItem('users', JSON.stringify(data));
  }

  authenticated(cb){
    setTimeout(cb, 1000);
  }

  unAuthenticated(cb){
    if(this.globalObj().sessionStorage !== null && this.globalObj().sessionStorage !== undefined && this.globalObj().sessionStorage.length > 0){
      this.globalObj().sessionStorage.removeItem('users');
    }
    setTimeout(cb, 1000);
  }

}
