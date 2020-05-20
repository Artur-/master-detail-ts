package org.artur.masterdetail.data;

import java.util.List;
import java.util.Optional;

public abstract class CrudEndpointWithService<T, ID> implements CrudEndpoint<T, ID> {

    protected abstract CrudService<T, ID> getService();

    @Override
    public List<T> list(int offset, int limit) {
        return getService().list(offset, limit);
    }

    @Override
    public Optional<T> get(ID id) {
        return getService().get(id);
    }

    @Override
    public T update(T entity) {
        return getService().update(entity);
    }

    @Override
    public void delete(ID id) {
        getService().delete(id);
    }

    @Override
    public int count() {
        return getService().count();
    }

}