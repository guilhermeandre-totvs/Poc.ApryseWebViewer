import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FoxitService  {
  apiPath = 'https://totvssign.dev.totvs.app/documents/'
  token = ' eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwidHlwIjoiSldUIn0.vx3fbL88Y5KY4HEo29rxB-xLZYMx_sb-ZqiQhhDXLwUOrOxYAky6cA.7Zs0TRqUlv39Ip2gYQvClw.gLt4a4QQF4nX30L2B6FqpDcUPTC5AYn1WxmLIQsXv0g6wPy_RvGAarOB5V41SiT_0jfzL7kyJy0fSba6kOW3r-2kugE_7UFYP8VrrRWvGFFjIjiIPkBXLiKfddxB8eymUN6rMZtek5DoxROqqUoqKGO9PsKtJIlvRY4btnY5-aOVcJjKRADgbOvCjrl7sEi0snNG9hZHQjBMMgTsc3-xJgeaSo2CJEZU2FMlZLtVGzSWAXE4xoHdgNI6dk66BSXOwpspq0uTyqSRxJ6sdCEfwf2LegP62OPTb8L_X5Oo-yZ_CACZ6t29v9KLe8BASey5K8QTdorsk-1nol5df-da4aPPARAKg274GFRP47LzlsB7AC5eBUj42jf_Uu1rcXfb_L92ZT3LyzGwKIeVtn23JRiyRHhaEYFDL-WICqXgPGITfc8-bEC3IRMZNcZ_qRQjGXEriG_zLcajiyq6RROYMYUHIu569DSpjx9GPDMswM5t0aJvASsTxRNZDhPAhpY8qw1KatQMN14RQdjIzPdPkBjAE14DVWSAWbfEIwcE1H9I1otFhNlfy-y86Wt91F7royHRfn6AyRJeS1vor4mKnfLabfiORRzk6m7kTdV1x1HAoeWneoc7bb0y4MglIY0jTOfpV4uikDZpmITon6bxCU8pjhW589iPDovaXjTAGT_I3DhXP9bvKETpP7rk0JCWu_zsZsIFfySECCOcr9mJi6LZfdDJBmVlXF1_vdpHZxEGUACuSewlOC13JI1JcXWL7yXPapQtqV2BHSwJxctLS3jNV5O-uCeO82YLg-VShGvR6KZhC8fOGeatK4fRW6CZwXFA37pUNrEkxIogVpknfksVZPIt2v3Rs3YHJPhfRztFHO-WVu1lekhYhqk2f-maK8YcdQECPe3BClsP6BPHhvoVtKpZkaqy6RkNSpO6_8D5i42ia899hMeZNhwwskokYPUDTKFuuhQRyQTr9lo_htt2_3uPeSN56LsYahfJgkfA6zY3Bjbmmustbkmckf4y3oeRHsrnO2iFCT4SqDaO2sKJXRQldTuXGyyGJ48zUjlVY1ZceUa9kzOI0O8u9dgqkrO94Vjgnc_figF6Aml-nqIgMjC5tbjJ9ANefCNrbflwr-T-8ZVst9pTDYzOC4thixecdVjj-UET7dmcEtNJbeG9PJdnd4Ey1Pi8VvhJ2E2Q1jnaUPOFzC99uw5kHNxGcAyqa3NATQ3zFQnvLKr3-XMKUWsW37oCh1sMpfFyn27EKqBISvD1mywbVYdvh9yPGU9WNk660JqvgsSZZEksRDCXaGwqu-s8km-kJV30lXKaG7f-XwneLqa7AtUC44dsLqZm0y5UXxYMN5MvtfNbmeMUTwpLcaej6JZhMlvETiZnKobID5kghljNTF6MnWcVvTKMFV_dYJZoC8Pew7apbGX6OwDqY6ICKJ1VBSvLikLmydNFna1DEXFIyIFhM_K13ES69tm6s3Lpk_UtQDKLs1fnHVHVNKq-2p5chJoCUjxg98e28BP00LSmbVK-i4DZ9Y9NvRFiT-8pR8nBrrL4v5Tx_MIiN70aFLb63EMaNKadUzp7y2Tc5ECQwBwnFY1egNeHt2_2pOWq-hegcXIIB68wEvFi7rqhmkmCZ34zdqOZeUslnWMc0TNjslwGvIvRJEyg9Xt5vUk2vvCJVsAe36CP6gyj4piudQkHjJKnliERejcvLcHM7j3Dk_Wn7Tk-v20598_Lznbk3igOzzUt_DuMgSeGOx_Var_FwXnOt3_wCcc8BWBiDjrkhRHqxlW95J_3srpDQzICIZjanBx2cjhEYFCiRFqNBSE0ZC0VhQtIlqs1k6Czr1SMHS2gEsmFHvFL-giOlivkmRdKlRwGGwYBTFuPKIIHQTuHHmGuYeQfjn1cXEX-KQDl_5D2eVK2sSr1UytfGrmdRYN_QhaoAXtZTajKW9n-FmMQfSRU6QrWfV2QFhNxPi0o19PEKw9hrap5wOncukbaHZTHiydMfUqG-TUOWx6sfJegHHb3kfpxphSuEgSy79SP49n4wcf2tprO1th5FaKiDc393HHhmLpWKahaaHd000eXBwBs8GKWi54hg_OyBVQ9QlZHbvOK.X6ufaKEf01d-fLMxf6tOdw'

  constructor(private http: HttpClient) {}

  downloadDocument(): Observable<any> {
    return this.http.get(`${this.apiPath}v1/publicacoes/858505/download?tipoDownload=1`,{
      headers: new HttpHeaders({
          'Authorization': 'Bearer' + this.token
      })
  } ).pipe(
      map(this.getData.bind(this)),
      catchError(this.handleError)
    )
  }

  private getData(jsonData: any) {
    if (jsonData.success){
      return jsonData.data;
    }
    else
      this.handleError(jsonData);
  }

  private handleError(error: any): Observable<any> {
    return throwError(error);
  }
}
