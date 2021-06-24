import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { APICONFIG } from '..';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient
  ) { }
  
  public getAllPosts(){
    return this.http.get<any>(`${APICONFIG.POST.GET_ALL}`).pipe(
      map((result) =>{
        return result;
      }),
      catchError((error) =>{
        throw error;
      })
    )
  }
  
  public getPostID(id){
    return this.http.get<any>(`${APICONFIG.POST.GET_ID, id}`).pipe(
      map((result) =>{
        return result;
      }),
      catchError((error) =>{
        throw error;
      })
    )
  }
  
  public addLike(id: number){
    console.log('vao');
    
    return this.http.post(`${APICONFIG.POST.LIKE(id)}`, null).pipe(
      map((result) =>{
        return result;
      }),
      catchError((error) =>{
        throw error;
      })
    )
  }
  
  public addComment(id, content){ 
    return this.http.post(`${APICONFIG.POST.COMMENT(id)}`, content).pipe(
      map((result) =>{
        return result;
      }),
      catchError((error) =>{
        throw error;
      })
    )
  }
  
  public showAllComment(){
    return this.http.get(`${APICONFIG.POST.SHOW_MORE_COMMENTS}`).pipe(
      map((result) =>{
        return result;
      }),
      catchError((error) =>{
        throw error;
      })
    );
  }
}
