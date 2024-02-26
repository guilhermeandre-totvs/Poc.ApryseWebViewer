import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApryseService  {
  apiPath = 'https://totvssign.staging.totvs.app/documents/'
  token = 'eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwidHlwIjoiSldUIiwiY3R5IjoiSldUIn0.ONWvOJfOHWwVS8B8ScKHE9Bei4ZQwevTZ4qvl3mzXSs5Rxoke6CTHQ.2IkUrLDrr7gg88a-1YYh2A.aKFGUvHlSy9C0tw8dNZh2Ol5ej4n99SUXl_xA7p6KcSMnlozshbamOP2bMgL2YRpNB4YznRefvMjUyT0eQjKNO4pYIjvu3B5Zxfl38FIVoJMw3asveybbaDSNiepR8-Qs3Aj5OzGdani8rGUuUxWHNhdedWs71XJIW4yb8OS5lt-IR4yTmsq62eSwJLAZw4J4uyaYEZ8xyho7_hbBjsbgUJ_O03cRadOwUvDnnQseMnnBVw3sRD2Sun68FHzy-Flx0abcwSt_ny1hBM0QqP-OeKuo5CKKfEY3yZzaw38w8d4oXgrox36rhwqYkhXxo3Jh5bBAASXEKEesdUMsIHo3xq1T-KgDHqviAc0wbN0OQg8q5PYWrgZKlSDr347tohg0pNyaSYju79kTAB_oYZ4xtSHoKal6s_sCaWtFZ55d4Aa4GhWSn8-i8NRgtJUhlYp9nYW24ahcT8XJil_jnfC0CAcPYbNAlqctgeaS00Y8osShi-6xm2Jz0cmrMNzEwiqY5b7PZcomqc0WEb6ALnaCADaDIePIEt0cv6VmBgwlyMeYL1vkFo5hDoTGRQt5CZsaXpLV52KjiqMhZVgNuE_hSrprIAMJXnFNXWN_GwoDNnLwnCtBqKqPgLDHtuOuFb72wh2HMJhXQ2wVTK3KWmBA4CbDZylSnRtgfOEfetLtTj9WP1ZuAVyPKnMY1XtEJRIvzJpGBmU5qbdKpQYiDrluhmYftykVaMJRDkF4ViSvFrbf9yCgrjIIJ8MoSXUsstoE3afDLV6_D6zdrMfcPp3QXCBrNZtVqkHl5A9jXXaS2eq5ZAyarD4_KcQIu_PoD6SSQioxIsRc0wL5b5W4doxhKVHBelpcl13ORYSQ-tRYDre2lvcvAwuFGLNz7zmgTFBudE5T2QOPv7r_QTSjj0zMMPc44Cb-PYQjsJC7UoKlvkcOke7rc2qwK5y9d8Wt_tQeEvLv-pipNH_lW7a4LnXJi1RdqFOeT1C2n1dSXGnj0pb8nnL3fOAkzhmMP5Tf_BuDacPwiP4SYK86mOf-_RWkBdFvO_Tfsg3P0HIuxaE-cUrmiKS1SdS2oi-mjnsReYLH5W0jlVzWuqOOxvz9wWOee3McG5FFmAIvA9TufMAhZsu42bRItwTyd0c72wLPary7uSoTNrxT5GBXjAEvl0Pimkk_TprzQ4YQ8sDtkpeiQxErodEgSz-qcUb7a2ecnvnOYINs3AnorhG7r2EpWL8E3-qKBkGv4ZelQTNaejK5Fj_0GPn9kfJ39dFBjAZIzxxV_9HrJOJxjXvZ3VhvAbTY0sGTCBW3-Z8lbB8xSZYk3hzuXrRfHyb_kOW5lojQYIhCS5ZZjXTHVRHzJhp84uP0tvZfyUhStxk3oF7hRKDV2-GwtbU5Fz1cXWGK2Uc3bWVHoUYDdI_MkAqkv5U7CMjWI1FRB75ghe_TwEaGLt8NcJh-W0kduih3Z2cYwx88JzzlmLN-NNW1-E7C7A1cJOAfBlV4aFhBDjE1KwAUPYR3XikdGOVsM1oI0o7d85GFaN4EC8f3iZYX62rTgPmzaiJjpYo4ifvPsA42xXL-s8IGsj3Bdkhw8xJiqkNYauNxcoDn6AIuUm6oNJ8ebRtGniOBVxNpAOZayS_oRnq2aRkXXKEun27AZAe6xG-AcMIMGU5BytI75ssX9v6_D5crc-l0VPC7hzaC-P0F5cFetjYmJYjk70GkTBwck8-xt5EZ46Z2gyWRQGcrXMcXUeLf7VePxx0HGWvAq4P4ptDNXu6cI7RVx_ZcQKI_I_gk-KCwOvKxN8z-YOB2ivJnafXE6ow-xX7URk7hRJ91YYs0Va5N--tLkH1cPi9cbHPe0JzSxTLM-QpiWyPGInvB3m18ha9S-Sm8XKBX6bF7XsGpB8JmzJaxsI2bdd0odz9M_WS5p05A6dqDEygvV_tFGDjpQvz26if2_N2HqZ9rw9NpjIXtrC0JqJhY9YuicNFdIQ32dbksw6TsuZa9k7qRJ27wzsrpL5uuYNp0UjQNiFm6dZqIFiqVOMhsif1RAFfce_-8Ti5_-eKcBNalJyAF76Zts850YSfPni_NgXbNZEji3qcO4IPQQFcvM-LWLcolxMjnKZJYOEfdBeMDbJz8MP7c13jUjFG0F_jUgP5X7sdH-Cc98s.Wf--J0wV7agczIXNM0f-9A'

  constructor(private http: HttpClient) {}

  downloadDocument(): Observable<any> {
    return this.http.get(`${this.apiPath}v1/publicacoes/304591/download?tipoDownload=1`,{
      headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.token
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
