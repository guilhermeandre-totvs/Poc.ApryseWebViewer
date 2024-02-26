import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApryseService  {
  apiPath = 'https://totvssign.staging.totvs.app/documents/'
  token = 'eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwidHlwIjoiSldUIiwiY3R5IjoiSldUIn0.5ysi47J2Db0Nj4W2_qGPweM-_iEiW6pYm-23A4_bGbZTmf-E3EqBXg.AMrt29C1A5GJgFt7AV843A.AKS8SDFkA7mZOVx9K2r1dbL27wtTKr2IGhRewqBYbcYhAuMCx-Yp_FHNrtS-hPq6Ux2GhoV6JLP6Z_xHJ7YyvpKYU_MlD5qys0GXfB1KWSjsX4iv0W3T43czHpohkPCM2_odvOlDqlGLwl2-iFx0k8qa9Yx7ZkRx7np4qhXKkpcoCZAzgjcjn59NNzDO2AoLvL_-pdc025ZERHhEIjolhYGEZlqVr7Rg8WNdqoo4dSYcQTDl-LxKOvagK50q-05RUsU78d6Am8NlANbAxDqCeH4qJld-JP4JmPJBiBgyzY8QZZKuSbt9vK22mttg5PJLXJoHP-kU91r4bh0YnU0ZE5gxR5_ahLqqak2REYrMSJkB7sMEk5KjClcrIhvZVzhhrFR5MIs0h2cacYNKZkh0s4ufGONqTqci5QrH0hTYbEUVVTAzadEsjQ91b0UTxbkURjxGF-rTeU6wApytHGHee289PpVhDjFIskEEjAnZwu9-6tJV_Spev2N3q1tnMthPrJlh-Y1iMkmr8B-xSK4I4aybrlZVDClvq8I4hhbqqQ3-9L3SQItgSUhJJ2wdLkpCdlsdQR2Z_ojeeRKbqfkMLXFeUVyeU494BsIQNVb4DAOWRNk-42ywtQzbtuTDMv6rH-Q2zj8IvGLYVAQ8EB_eJm9G6dcRJiwOUcX-HU-trGBzr4ov2g8Sl_wuVsj8SdL3UTdhBPCyeJh5Ikx1HAUfHc_qdNIBzbm1K6ZmcH_eQKTcxDnXIfHgqx4xmnDeI41m16JLqoGLnRH1NBfSNd29FdeXfINanwTTyKtgmOPuhzR7H0gCwoPUL1A5a21vJAbn-v57d9kL5TP5XcjCsQ-RJ_46oBoBbYaB47UdBnZoO_zhUTwSDDupHRMJ5Lh3zcY7vR16I-0enAuJRnxcTi5OSkzXgHdled5LS62l032hV0XcF4OsMaS4tEUL9OpA07M33mQBKAcPzwe9E-aal_3LAEoo9Soc25RySJx6d8ouKtJcbqeB3i5LLWGgC51GNeszw0XpDLR6toEh1ewhji9P0elMJmIeNmp6hWKFbqtpMP0is0RPDro1rhhxNL29Q7UJ8TECHASJQb4hxoaD4QLvOZxssEbUgXdHFKKrAF4vjYGcx3eB-VmZ8LcTeO8xsvsaBIg2yElNFmQbU8eMH3tYbcj60ZQ2DVnoRrShtfXb1WOceqrpxymud9aj7LcuD4ahP_udJ1HHWHkQ8zfR0adYjvx-dlioDZ1Pfkrkyk8Rm4nfZCNSBqRFldVWtqJri1_29rf4Ou4BLUM8Wlj1W9bGUopKhgjKNM1W3kK2xCRNiPClsnZXHRLVG8_wrC30k7ndVZHs0NEPmWebIo0vQSWm571i0yE_ggz2T_rTD1py7zb02Cm3BnzaMtYgoWm7xsQOauQTTnXZeLYuNxMUoKHfxwRFLOMQ77mZYd_VpAsemxXLlbFeAdcB7jPQjjqG702VJ5Kfbg3g9wRHrZib0Fuw9d0Yg0SZw0xNHLSIV7-y5oyUzFbvPG8fRbMldeae6L6K6mULIUvsjvVT35jTbwvKYVBD6-dELylLJweBNPVDaLFhKalWGrJVwdtMgpC-NeyfWRThV5RXG4DJcWaN7s05-tQvj17vvIWfdHyEgAUVMIJPjgcet46wIbC-jlgraKYyUejVOSp2VDo8xNcIijU-2SjirTpLtqL9kqxahbe9JiPpycwxyGEYgMkBpPmgy4rGdFxleAZMGg8_PTPC8QtMXIPWu0SrLD_j4nr3YzOyg4vH_7qs34XBxsSU-2KhmX9kN_hSOZaaFHb3S61JwMvOjr8zMk3AKn7ACpy__cxo6TtTkTuPtREhlA17UK6h_Ri62_JJFHKjeJLpo1JGZN72IBV1xh-1gcwHrwmCurS2N9TrccOCBx_1UYBOkmX-yi_VBusUgPQrvBhK9TeshjZf57VqjzQCRNxDJChpRg7DaB3GG_2EBd2spMuhKkapXV1j6h7BukgPPdwPQnoNOS-ZDb7WLFOtd0kU1jIHF-nQsJQtRWlHXgbXBx4D1QWnj0Vk38vWXMiezNMFLJYXS5yBDJSyxONmFPci5XP0Ct-JjAmO0SrEg1b9hUUa-1HEyVDK2Z93x954hNIeDJV-SDcFF1YEY6AbyeKUzLUzrA1wz8U.mx6T_Kptyre4Lq-2xXBoYQ'
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
