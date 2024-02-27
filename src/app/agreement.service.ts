import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApryseService  {
  apiPath = 'https://totvssign.staging.totvs.app/documents/'
  token = 'eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwidHlwIjoiSldUIiwiY3R5IjoiSldUIn0.xeezmBMRvIuAW-boXwlwp6Rd9zXLl7GFbcm93VC4gnZNj49PmNix2Q.gdtJC12iVsCCnaBgEhIb_g.8-g--L5UYOXAMG700ZJooq9ES8bLno3wfFOH54MjJoDfIJnqFI_4PY3FeQ-qg0_o0ENSC2khmTUopzmUi8Q3UlZ7V5Zg804qF9yuDHEV95_Y1ZD3dCvevTOgTgRVIcQuKEsOXgCU4M--TyTBxUA4ToWjXMyVEOAT1jdqBuh00v_390tkAGWtdL5CCmjDfYdyoLikhO-HgIHYJkwmfub9ByAU-x8KR38VqQimPmpvt8xaJB6Njl9FeU77d1xnlSM1aD06oROa2ZpZcMXB2c0o5xeZ_dt6OQQH_Nilj1qsu1xSXPi6VMNgz-KElvq8bJX1uw3ymc5jk7r2rNWOWoMuqFwrjLy19dcf5Z-S02zSciUZL_sGzTDRMHnQYWtjPyiF4tQFOY8d6Umi50iuF9KpVHB_zc3ukctg1QVEpZh1_EIWWsVcLAaznVknl8HLqE1fgT4J-uKXkb0YeJ5CqT-h7ONSN0QzdWwhpjuA6pgnWYq7ncx8IafwAAiAjik1ihiksc1nqWyaMshsLhJ_hKyMW5d7fXjuVIINUESoQMUdlu6POTRr4k5QkJrCpp2J-VCsmMq4yjjZdfVtDA374eVD5uBit0qmIPKVdpuYA_g6jjHKo3C0k9FVIqwU1pz2ji3WA9UCAy6VGyqjM92LjiMQiqgPGBC5Hj6gFaJfex6grhfjAqA8AzSyqfdNCJcbCceqLzt5aeRbh9q_QIQguH6-Ryv2A9e-h68noowEK_6SVwG9SJ2Med5khDFEbthKV4ZfgvU4Ss3yCJVnJs9sXdn3aHwmFNzrKwn8vij8H94gSGSa-w-eGDAAlOyjgMuiLmnbXSCwylkdjBKJdVnzUzweV5Vg42lG9vPybAgCV9SVhr5lTl6mP3FAFhBkbdSGyaEtWOhrBVzfdwtFr_oRkFs7qd5bvyF34XL_N5OBFUi7kVy1EVLz2RVyu6y4amfP3ZooWonEgRNYa3_xtVqav2x8hBbp7Utfg1bsArfOwLLtnxhSGl0GyG4mzgZSyAlVh8LhxRhAI0JdmIHW9lF6LCnJaOYt_dCXkWcthVk1DL2VxZnBNuMukTi04nA8VAsVJOoPAC_DjQLkpjO_M6wFcpuKZUlQpxv1uVsYacJnZReuwfoCLGioj0-1G2p4ThkBXVdmCAUUlTIdsPXKCP2_64HFfli3LVxvPcw19X7GS-Y4oeNPquOiG6p6gqPDC6y7ZEVghzg0q-cd9DSUAAF3UjA9p0eyAESUdSwUwsZfeUwYIujUAlNju_gfBv4nDT5SSY7AXxFZeX5zviZDVHW1HROEswOtMsLBb3XAWIQERoTHK53kR4Huri_uyGm9HfoOx6qy0TEmp32Z5DeBr5kFyAraLMcuzzbuL9wBlcmAIooaP7bZ0R0rI-cLCL4Y5z5-Ky7FWRFLZT42Lvezouq7vZXSASOFFpNnnNKZnCWrajQOGrjl-nUeW6-GkoHShD2kULiMf_DfAs9WlxVu9_MqbQrMw-UL0LUnfwvZlpbqzNTs0NA5LPxwPxBx6IY-mC3vcOAAyPf6zHU1cZ2EmjKcqBp6hPYUv0Te6DHvItB9KSBJz_pNZX_qdZ8y-FCBQUl3z-1SvD44rhcA-rZZVg0HiNJwWCeLjH4r7WubZKzMTYPm__8Rzdzve9gXe_TjFQaVUCZ1YReB0rwhLpn5ZBmlHUakQF0IQe6YwN3j6KILZrKD66wKqV2XrfzcldqaKUnqeQAoWt8YU-AEpLowtmUcOK98rtSlbnW0yDyjhl8D5wT8yNeZKLVhiXzNORzo7N-DxLNdcj-gm7vJoEjJxRluPdyEqjvOFHOZ-YJXvaRFP5u2zO_8AdrJXBp3WrFN3CdpzmN0YsjRLDy6-KCDG_T5hOhgEx9lagkzzWRfhMuoJc0Qh6_XMo20GWZ7osF4kPcURr6w23ooxdH4juPyfMuJsPpZDmuYyFJzPGC-UpqftIZ3PKZqxRL0hzi8FRz8KxTPx6hXjh1Ytp8ncHgsh4sYF9aLXgAWFBkAe_er_2YWsqAIAXarfrUip2MmIiM1fmmjztuQBt_guYGM919-A37rmCgZaQ3KMRY_G3jRQI3luD4J3hEGiTGGF_WnEsnBZcS6xehnvNH9t9AFQqdKTx51SKHsr1yJtv7DF3vAv2RfDeVraRg.bxzbKLVPKbj3J7HMabEFOA'

  //305605
  constructor(private http: HttpClient) {}

  downloadDocument(): Observable<any> {
    return this.http.get(`${this.apiPath}v1/publicacoes/305605/download?tipoDownload=1`,{
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
