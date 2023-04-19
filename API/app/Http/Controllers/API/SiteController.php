<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SiteResource;
// TODO fix imports path
use App\Http\Requests\StoreSiteRequest;
use App\Http\Requests\UpdateSiteRequest;
use App\Models\Site;

class SiteController extends Controller
{

  /**
   * Display a listing of Sites
   * 
   * @return Illuminate\Http\Resources\Json\AnonymousResourceCollection
   */
  public function index()
  {

    return SiteResource::collection(
      Site::query()->orderBy('id', 'desc')->paginate()
    );
  }

  /**
   * Create a new Site
   * 
   * @param StoreSiteRequest $request
   * 
   * @return Illuminate\Http\Response;
   */
  public function store(StoreSiteRequest $request)
  {
    $data = $request->validated();
    $site = Site::create($data);

    return response(new SiteResource($site), 201);
  }

  /**
   * Return a resource
   * 
   * @param Site $site
   * 
   * @return Illuminate\Http\Resources\Json\AnonymousResourceCollection
   */
  public function show(Site $site)
  {

    return new SiteResource($site);
  }

  /**
   * Update the information of a site
   * 
   * @param Site $site
   * 
   * @return Illuminate\Http\Resources\Json\AnonymousResourceCollection
   */
  public function update(UpdateSiteRequest $request, Site $site)
  {
    $data = $request->validated();

    $site->update($data);

    return new SiteResource($site);
  }

  /**
   * Return a resource
   * 
   * @param Site $site
   * 
   * @return Illuminate\Http\Resources\Json\AnonymousResourceCollection
   */
  public function destroy(Site $site){
    $site->delete();

    return response('Site deleted successfully', 204);
  }
}
